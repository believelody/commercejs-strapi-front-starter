<script>
	import { session } from '$app/stores';
	import { t } from '$lib/i18n';
	import LoginForm from '../forms/LoginForm.svelte';
	import RegisterForm from '../forms/RegisterForm.svelte';
	import ModalWrapper from '$elements/modal/ModalWrapper.svelte';
	import { notifications } from '$elements/notification/Notification.svelte';
	import { fullName } from '$utils/user.util';
	import { modal } from '$elements/modal/Modal.svelte';
import { authenticated, confirmed, user } from '$lib/stores';

	export let modalId, title;
	let isLogin = true;

	function onSubmitEvent({ detail }, modalId) {
		notifications.success({
			title: $t('notifications.auth.title'),
			message:
				detail.authType === 'register'
					? $t(`notifications.auth.message.register`, { name: fullName(detail.user) })
					: $t(`notifications.auth.message.login`)
		});
		// $authenticated = true;
		// $confirmed = detail.user.confirmed;
		$session = {
			user : detail.user,
			authenticated : detail.authenticated
		}
		modal.close(modalId);
	}
</script>

<ModalWrapper {modalId}>
	{#if isLogin}
		<LoginForm
			title={title || $t('auth.login.title')}
			withoutShadow
			on:submitEvent={(e) => onSubmitEvent(e, modalId)}
			on:toggleAuth={() => (isLogin = false)}
		/>
	{:else}
		<RegisterForm
			title={$t('auth.register.title')}
			withoutShadow
			on:submitEvent={(e) => onSubmitEvent(e, modalId)}
			on:toggleAuth={() => (isLogin = true)}
		/>
	{/if}
</ModalWrapper>

<style>
	/* your styles go here */
</style>
