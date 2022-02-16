<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import { t } from '$lib/i18n';
	import { jwt } from '$lib/stores';
	import LoginForm from './LoginForm.svelte';
	import RegisterForm from './RegisterForm.svelte';
	import { openModal } from '../../elements/modal/Modal.svelte';
	import RegisterSuccessModal from '../modals/RegisterSuccessModal.svelte';

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
		}
	}

	function showModal(user) {
		openModal({
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
