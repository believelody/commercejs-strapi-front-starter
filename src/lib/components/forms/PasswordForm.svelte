<script>
	import api from '$api';
	import { t } from '$lib/i18n';
	import TextInput from '$elements/input/TextInput.svelte';
	import Form from '$elements/form/Form.svelte';
	import PrimaryButton from '$elements/button/PrimaryButton.svelte';
	import { notifications } from '$elements/notification/Notification.svelte';

	let password = '',
		newPassword = '',
		hasError = false,
		loading = false,
		isValid = false;

	async function submit() {
		loading = true;
		const res = await api.user.updatePassword(password, newPassword);
		if (res.success) {
			notifications.success({
				title: $t(`notifications.password.title`),
				message: $t(`notifications.password.message`)
			});
			password = newPassword = '';
			isValid = false;
		} else {
			hasError = true;
		}
		loading = false;
	}

	function resetError() {
		hasError = false;
	}

	$: isValid = !!(password && newPassword && newPassword !== password);
</script>

<Form on:submit={submit}>
	<div slot="content" class="border border-neutral rounded grid grid-cols-1 gap-4 bg-danger-light-1 p-2">
		<TextInput
			name="password"
			type="password"
			label={$t('account.profile.password.label')}
			placeholder={$t('account.profile.password.placeholder')}
			value={password}
			on:input={(e) => (password = e.target.value)}
			on:focus={resetError}
			class="bg-white rounded pl-2 pb-2"
			align="vertical"
		/>
		<TextInput
			name="newPassword"
			type="password"
			label={$t('account.profile.new-password.label')}
			placeholder={$t('account.profile.new-password.placeholder')}
			value={newPassword}
			on:input={(e) => (newPassword = e.target.value)}
			on:focus={resetError}
			class="bg-white rounded pl-2 pb-2"
			align="vertical"
		/>
		{#if hasError}
			<div class="w-full flex items-center justify-center">
				<p class="text-sm text-red-400">{$t('account.profile.update-password.failed')}</p>
			</div>
		{/if}
		<div class="flex-center-middle">
			<PrimaryButton disabled={!isValid || loading}>
				{$t(`account.profile.update-password.${loading ? 'loading' : 'submit'}`)}
			</PrimaryButton>
		</div>
	</div>
</Form>

<style>
	/* your styles go here */
</style>
