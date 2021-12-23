<script>
    import { t } from '$lib/i18n';
    import { sidebar } from '$lib/stores';
    import AddressSidebar from '../sidebar/AddressSidebar.svelte';

    export let type;

    function showAddressSidebar() {
        sidebar.set({
            component: AddressSidebar,
            props: { type }
        });
    }
</script>

<style>
    /* your styles go here */
</style>

<button on:click={showAddressSidebar} class="bg-indigo-400 py-1 px-2 rounded disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed" {...$$restProps}>
    {$t("account.addresses.select")}
</button>