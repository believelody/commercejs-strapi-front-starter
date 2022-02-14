<script>
    import { getContext } from 'svelte';
    import { t } from '$lib/i18n';
    import { openDangerModal } from '../../context/modal';
import DangerButton from '../../elements/button/DangerButton.svelte';
    
    export let title, description, actionCallback, type;
	const { open } = getContext("simple-modal");

    async function showRemoveModal() {
        openDangerModal(open, {
            title,
            description,
            actionCallback,
            notificationHeading: $t(`notifications.address.heading.${type}`),
            notificationText: $t("notifications.address.description.remove"),
        });
    }
</script>

<style>
    /* your styles go here */
</style>

<DangerButton outlined on:click={showRemoveModal} {...$$restProps}>
    {$t("common.delete")}
</DangerButton>