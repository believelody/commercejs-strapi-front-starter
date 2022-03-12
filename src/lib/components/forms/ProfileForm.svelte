<script>
	import { onMount } from 'svelte';
	import api from '$api';
	import { t } from '$lib/i18n';
	import { profile } from '$lib/stores';
	import TextInput from '$elements/input/TextInput.svelte';
	import CheckboxInput from '$elements/input/CheckboxInput.svelte';
	import { clickLinkOutside } from '../../actions/clickOutside';
	import { emailValidation } from '$utils/form.util';
	import Form from '$elements/form/Form.svelte';
	import PrimaryButton from '$elements/button/PrimaryButton.svelte';
	import { notifications } from '$elements/notification/Notification.svelte';

	let firstname,
		lastname,
		birthday,
		email,
		subscribed,
		hasError = false,
		loading,
		isDraft = false;

	async function submit() {
		loading = true;
		let isValid = false;
		let username = '';
		let customerData = {};
		let userData = {};
		if (firstname) {
			customerData.firstname = firstname;
			username = firstname.toLowerCase().split(' ').join('-');
		}
		if (lastname) {
			customerData.lastname = lastname;
			lastname
				.toLowerCase()
				.split(' ')
				.forEach((word) => {
					username = username.concat('-', word);
				});
		}
		if (birthday) {
			customerData.meta = { ...$profile.customer.meta, birthday };
		}
		if (username) {
			userData.username = username;
		}
		if (email) {
			userData.email = email;
		}
		userData.subscribed = subscribed;
		const res = await api.user.update({
			customerData,
			userData
		});
		if (res.success) {
			notifications.success({
				title: $t(`notifications.profile.title`),
				message: $t(`notifications.profile.message`)
			});
			isValid = false;
			isDraft = false;
		} else {
			hasError = true;
		}
		loading = false;
	}

	function resetError() {
		hasError = false;
	}

	onMount(() => {
		if ($profile) {
			firstname = $profile.customer.firstname;
			lastname = $profile.customer.lastname;
			birthday = $profile.customer.meta.birthday;
			email = $profile.email;
			subscribed = $profile.subscribed;
		}

		return () => (isDraft = false);
	});

	$: isDraft =
		firstname !== $profile?.customer.firstname ||
		lastname !== $profile?.customer.lastname ||
		email !== $profile?.email ||
		birthday !== $profile?.customer.meta.birthday ||
		subscribed !== $profile?.subscribed;
	$: isValid = !!(firstname && email && emailValidation(email)) && isDraft;
</script>

<div
	use:clickLinkOutside={{ isDraft, text: $t('account.profile.draft.confirm') }}
	on:clicklinkoutside={() => (isDraft = false)}
>
	<Form id="profile-form" on:submt={submit}>
		<div slot="content" class="border border-neutral rounded p-2 grid gid-cols-1 gap-4">
			<TextInput
				name="firstname"
				label={$t('identity.firstname.label')}
				placeholder={$t('identity.firstname.placeholder')}
				value={firstname}
				on:input={(e) => (firstname = e.target.value)}
				on:focus={resetError}
				required
			/>
			<TextInput
				name="lastname"
				label={$t('identity.lastname.label')}
				placeholder={$t('identity.lastname.placeholder')}
				value={lastname}
				on:input={(e) => (lastname = e.target.value)}
				on:focus={resetError}
				required
			/>
			<TextInput
				name="email"
				id="email-form"
				type="email"
				label={$t('identity.email.label')}
				placeholder={$t('identity.email.placeholder')}
				value={email}
				on:input={(e) => (email = e.target.value)}
				on:focus={resetError}
				required
			/>
			<TextInput
				name="birthday"
				type="date"
				label={$t('account.profile.birthday.label')}
				value={birthday}
				on:input={(e) => (birthday = e.target.value)}
				on:focus={resetError}
			/>
			<CheckboxInput
				bind:checked={subscribed}
				name="subscribed"
				class="py-2"
				label={$t('account.profile.subscribed.label')}
				labelBeforeCheckbox
			/>
			{#if hasError}
				<div class="w-full flex items-center justify-center mt-2">
					<p class="text-sm text-red-400">{$t('account.profile.update.failed')}</p>
				</div>
			{/if}
			<div class="flex-center-middle">
				<PrimaryButton disabled={!isValid || loading}
					>{$t(`account.profile.update.${loading ? 'loading' : 'submit'}`)}</PrimaryButton
				>
			</div>
		</div>
	</Form>
</div>
