<script>
	import { t } from '$lib/i18n';
	import { jwt } from '$lib/stores';
	import LoginForm from '../forms/LoginForm.svelte';
	import RegisterForm from '../forms/RegisterForm.svelte';
	import ModalWrapper from '$lib/elements/modal/ModalWrapper.svelte';
	import ConfirmationEmailModal from './ConfirmationEmailModal.svelte';
	import { closeModal, openModal } from '../../elements/modal/Modal.svelte';
	import { notifications } from "../../elements/notification/Notification.svelte";

	let isLogin = true;
	

	function onSubmitEvent({ detail }) {
		if ($jwt) {
			const name = `${detail.user?.firstname} ${detail.user?.lastname}`;
			notifications.success({
				title: $t('notifications.auth.title'),
				message: $t(`notifications.auth.message.${detail.authType}`, { name }),
			});
			if (detail.authType === 'register') {
				openModal(ConfirmationEmailModal);
			} else {
				closeModal();
			}
		}
	}
</script>

<ModalWrapper>
	{#if isLogin}
		<LoginForm
			title={$t('auth.login.title')}
			withoutShadow
			on:submitEvent={onSubmitEvent}
			on:toggleAuth={() => (isLogin = false)}
		/>
	{:else}
		<RegisterForm
			title={$t('auth.register.title')}
			withoutShadow
			on:submitEvent={onSubmitEvent}
			on:toggleAuth={() => (isLogin = true)}
		/>
	{/if}
</ModalWrapper>

<style>
	/* your styles go here */
</style>
