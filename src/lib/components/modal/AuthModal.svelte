<script>
    import {getContext} from "svelte";
    import { getNotificationsContext } from "svelte-notifications";
    import { t } from '$lib/i18n';
    import { jwt } from '$lib/stores';
    import LoginForm from '../form/LoginForm.svelte';
    import RegisterForm from '../form/RegisterForm.svelte';
    import ModalBox from "../box/ModalBox.svelte";

    export let title;
    let isLogin = true;
    const {open, close} = getContext("simple-modal");
    const { addNotification } = getNotificationsContext();

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
            if (detail.authType === "register") {
                open(ConfirmationEmailModal);
            } else {
                close();
            }
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<ModalBox>
	{#if isLogin}
        <LoginForm {title} withoutShadow on:submitEvent={closeModal} on:toggleAuth={() => isLogin = false} />
    {:else}
        <RegisterForm {title} withoutShadow on:submitEvent={closeModal} on:toggleAuth={() => isLogin = true} />
    {/if}
</ModalBox>