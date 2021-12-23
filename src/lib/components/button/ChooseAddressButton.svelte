<script>
    import { createEventDispatcher } from 'svelte';
    import { getNotificationsContext } from 'svelte-notifications';
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import { sidebar } from '$lib/stores';

    export let item;
    let loading = false;
    const dispatch = createEventDispatcher();
    const { addNotification } = getNotificationsContext();

    async function chooseAddress() {
        loading = true;
        dispatch("loading", {loading});
        const res = await api.address.choose(item);
        if (res.success) {
            addNotification({
                position: 'bottom-left',
                heading: $t(`notifications.address.heading.${item.type}`),
                text: $t(`notifications.address.description.select`),
                description: $t(`notifications.address.description.select`),
                type: 'success',
                removeAfter: 5000
            });
            $sidebar = null;
        }
        loading = false;
        dispatch("loading", {loading});
    }
</script>

<style>
    /* your styles go here */
</style>

<button on:click={chooseAddress} disabled={loading} class="bg-indigo-400 py-1 px-2 rounded disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">
    {$t("account.addresses.choose")}
</button>