<script>
	import { t } from '$lib/i18n';
	import { jwt } from '$lib/stores';
	import LoginForm from './LoginForm.svelte';
	import RegisterForm from './RegisterForm.svelte';
	import RegisterSuccessModal from '../modals/RegisterSuccessModal.svelte';
	import { notifications } from '$elements/notification/Notification.svelte';
	import { modal } from '$elements/modal/Modal.svelte';

	let isLogin = true;

	function onSubmitEvent({ detail }) {
		if ($jwt) {
			const name = `${detail.user?.firstname} ${detail.user?.lastname}`;
			notifications.success({
				title: $t('notifications.auth.title'),
				message: $t(`notifications.auth.message.${detail.authType}`, { name })
			});
		}
	}

	function showModal(user) {
		modal.open({
			component: RegisterSuccessModal,
			props: { fullname: `${user.firstname} ${user.lastname}` }
		});
	}
</script>

{#if isLogin}
	<LoginForm on:submitEvent={onSubmitEvent} on:toggleAuth={() => (isLogin = false)} />
{:else}
	<RegisterForm
		on:submitEvent={({ detail: { user } }) => showModal(user)}
		on:toggleAuth={() => (isLogin = true)}
	/>
{/if}

<style>
</style>
