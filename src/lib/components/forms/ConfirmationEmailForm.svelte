<script>
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n';
	import { user } from '$lib/stores';
	import api from '$api';
	import TextInput from '$elements/input/TextInput.svelte';
	import Form from '$elements/form/Form.svelte';
	import { closeModal, disableCloseModal, resetModalCloseOptions } from '$elements/modal/Modal.svelte';
	import LinkButton from '$elements/button/LinkButton.svelte';
	import Button from '$elements/button/Button.svelte';
	import PrimaryButton from '$elements/button/PrimaryButton.svelte';

	export let withoutShadow = false;
	let code = '',
		loading = false,
		hasError = false,
		codeResent = false,
		errorCode = null;
	const dispatch = createEventDispatcher();

	async function submit() {
		loading = true;
		disableCloseModal();
		const res = await api.auth.codeVerification($user.email, code);
		if (res.success) {
			resetModalCloseOptions();
			dispatch('submitEvent', { success: true });
		} else {
			hasError = true;
			errorCode = res.message;
			resetModalCloseOptions();
		}
		loading = false;
	}

	async function resendCode() {
		loading = true;
		disableCloseModal();
		const res = await api.auth.resendCode($user.email);
		if (res.success) {
			codeResent = true;
		} else if (res.error) {
			hasError = true;
			resetModalCloseOptions();
		}
		loading = false;
	}

	function logoutAndClose() {
		api.auth.logout();
		closeModal();
	}
</script>

<h2 class="uppercase tracking-wide text-lg font-semibold text-neutral-700 text-center my-2">
	{$t('auth.code.title')}
</h2>
<Form
	id="confirm-email-form"
	on:submit={submit}
	{withoutShadow}
	class="w-full flex-col xl:justify-between"
>
	<svelte:fragment slot="content">
		<TextInput
			name="code"
			placeholder={$t('auth.code.placeholder')}
			value={code}
			on:input={(e) => (code = e.target.value)}
			on:focus={() => (hasError = false)}
		/>
		<PrimaryButton disabled={!code || loading} type="submit">
			{$t('common.validate')}
		</PrimaryButton>
		<Button disabled={loading} type="button" on:click={logoutAndClose}>
			{$t('account.logout')}
		</Button>
	</svelte:fragment>
</Form>
<LinkButton disabled={loading} on:click={resendCode}>
	{$t('auth.code.no-code')}
</LinkButton>
{#if codeResent}
	<h5 class="text-center lg:text-left text-sm text-primary py-2">{$t('auth.code.resent')}</h5>
{:else if hasError}
	{#if errorCode}
		<h5 class="text-center lg:text-left text-sm text-danger py-2">{$t(`auth.${errorCode}`)}</h5>
	{:else}
		<h5 class="text-center lg:text-left text-sm text-danger py-2">{$t('auth.code.error')}</h5>
	{/if}
{/if}

<style>
	/* your styles go here */
</style>
