<script>
    import { getContext } from 'svelte';
    import { getNotificationsContext } from 'svelte-notifications';
    import { t } from '$lib/i18n';
    import { jwt } from '$lib/stores';
    import LoginForm from "./LoginForm.svelte";
    import RegisterForm from "./RegisterForm.svelte";
    import { openRegisterSuccessModal } from '../../context/modal';

    let isLogin = true;
    const { addNotification } = getNotificationsContext();
    const {open} = getContext("simple-modal");

    function closeModal({ detail }) {
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
</script>

<style>
</style>

{#if isLogin}
    <LoginForm on:submitEvent={closeModal} on:toggleAuth={() => isLogin = false} />
{:else}
    <RegisterForm
        on:submitEvent={({ detail: {user} }) => openRegisterSuccessModal(open, {fullname: `${user.firstname} ${user.lastname}`})}
        on:toggleAuth={() => isLogin = true}
    />
{/if}