<script>
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n';
	import api from '$api';
	import { media } from '$lib/stores';
	import TextInput from '$elements/input/TextInput.svelte';
	import { emailValidation } from '$utils/form.util';
	import Form from '$elements/form/Form.svelte';
	import PrimaryButton from '$elements/button/PrimaryButton.svelte';
	import { modal } from '$lib/elements/modal/Modal.svelte';

	export let withoutShadow = false,
		title;
	let firstname,
		lastname,
		email,
		password,
		loading = false,
		hasError = false;
	const dispatch = createEventDispatcher();

	async function submit() {
		modal.disableCloseModal();
		loading = true;
		hasError = false;
		const res = await api.auth.register(firstname, lastname, email, password);
		if (res.success) {
			dispatch('submitEvent', { user: { firstname, lastname }, authType: 'register' });
			firstname = lastname = email = password = '';
		} else {
			hasError = true;
			modal.resetModalCloseOptions();
		}
		loading = false;
	}

	$: isValid = !!(firstname && password && email && emailValidation(email));
</script>

<Form id="register-form" on:submit={submit} {withoutShadow} class="flex-col">
	<h3 slot="header" class="tracking-wide font-semibold text-neutral-dark m-2 text-center">
		{title}
	</h3>
	<svelte:fragment slot="content">
		<!-- <div class="w-full flex justify-between border-b border-neutral-300 py-3 px-2">
            <span class="sm:text-right xl:mr-2">{$t("identity.civility.title")}</span>
            <div class="flex justify-around grow">
                <Radio
                    label={$t("identity.civility.m")}
                    name="gender"
                    value="m"
                    id="male"
                    on:change={() => gender = "m"}
                />
                <Radio
                    label={$t("identity.civility.f")}
                    name="gender"
                    value="f"
                    id="female"
                    on:change={() => gender = "f"}
                />
            </div>
        </div> -->
		<TextInput
			name="firstname"
			required
			label={$t('identity.firstname.label')}
			placeholder={$t('identity.firstname.placeholder')}
			on:input={(e) => (firstname = e.target.value)}
			on:focus={() => (hasError = false)}
			align={$media.mobile ? 'vertical' : 'horizontal'}
		/>
		<TextInput
			name="lastname"
			label={$t('identity.lastname.label')}
			placeholder={$t('identity.lastname.placeholder')}
			on:input={(e) => (lastname = e.target.value)}
			on:focus={() => (hasError = false)}
			align={$media.mobile ? 'vertical' : 'horizontal'}
		/>
		<TextInput
			name="email"
			type="email"
			required
			label={$t('identity.email.label')}
			placeholder={$t('identity.email.placeholder')}
			on:input={(e) => (email = e.target.value)}
			on:focus={() => (hasError = false)}
			align={$media.mobile ? 'vertical' : 'horizontal'}
		/>
		<TextInput
			name="password"
			type="password"
			hint={$t('identity.password.hint')}
			required
			label={$t('identity.password.label')}
			placeholder={$t('identity.password.placeholder')}
			on:input={(e) => (password = e.target.value)}
			on:focus={() => (hasError = false)}
			align={$media.mobile ? 'vertical' : 'horizontal'}
		/>
		{#if hasError}
			<div class="w-full flex items-center justify-center mt-2">
				<p class="text-sm text-danger">{$t('auth.register.failed')}</p>
			</div>
		{/if}
		<div class="mx-auto-auto my-4 grid grid-cols-1 md:grid-cols-5 gap-y-2 items-center">
			<PrimaryButton class="col-span-2" type="submit" disabled={!isValid || loading}
				>{$t(`auth.register.${loading ? 'loading' : 'submit'}`)}</PrimaryButton
			>
			<span class="text-center">{$t('common.or')}</span>
			<PrimaryButton
				class="col-span-2"
				outlined
				type="button"
				on:click={(e) => dispatch('toggleAuth')}>{$t('auth.login.submit')}</PrimaryButton
			>
		</div>
	</svelte:fragment>
</Form>

<style>
	/* your styles go here */
</style>
