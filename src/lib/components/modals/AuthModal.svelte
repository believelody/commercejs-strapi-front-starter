<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import { t } from '$lib/i18n';
	import { jwt } from '$lib/stores';
	import LoginForm from '../forms/LoginForm.svelte';
	import RegisterForm from '../forms/RegisterForm.svelte';
	import ModalWrapper from '$lib/elements/modal/ModalWrapper.svelte';
	import { closeModal, openModal } from '../../elements/modal/Modal.svelte';
	import ConfirmationEmailModal from './ConfirmationEmailModal.svelte';

	let isLogin = true;
	const { addNotification } = getNotificationsContext();

	function onSubmitEvent({ detail }) {
		if ($jwt) {
			const name = `${detail.user?.firstname} ${detail.user?.lastname}`;
			addNotification({
				position: 'top-left',
				heading: $t('notifications.auth.heading'),
				text: $t(`notifications.auth.description.${detail.authType}`, { name }),
				description: $t(`notifications.auth.description.${detail.authType}`, { name }),
				type: 'success',
				removeAfter: 5000
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
