<script>
    import { getContext } from 'svelte';
    import { t } from '$lib/i18n';
    import { openDangerModal } from '../../context/modal';
    
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

<button on:click={showRemoveModal} class="border border-red-500 bg-white text-red-500 py-1 px-3 rounded disabled:opacity-75 disabled:bg-gray-500 disabled:border-0 disabled:text-black disabled:cursor-not-allowed" {...$$restProps}>
    {$t("common.delete")}
</button>