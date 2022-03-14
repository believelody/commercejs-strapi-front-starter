<script>
	import { t } from '$lib/i18n';
	import { jwt } from '$lib/stores';
	import LoginForm from '../forms/LoginForm.svelte';
	import RegisterForm from '../forms/RegisterForm.svelte';
	import ModalWrapper from '$elements/modal/ModalWrapper.svelte';
	import { closeModal } from '$elements/modal/Modal.svelte';
	import { notifications } from '$elements/notification/Notification.svelte';
	import { fullName } from '$lib/utils/user.util';

	let isLogin = true;

	function onSubmitEvent({ detail }) {
		if ($jwt) {
			const name = fullName(detail.user);
			notifications.success({
				title: $t('notifications.auth.title'),
				message:
					detail.authType === 'register'
						? $t(`notifications.auth.message.register`, { name })
						: $t(`notifications.auth.message.login`)
			});
			closeModal();
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
