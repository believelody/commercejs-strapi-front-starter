<script>
    import { t } from '$lib/i18n';
    import { sidebar } from '$lib/stores';
    import PrimaryButton from '../../elements/button/PrimaryButton.svelte';
    import AddressSidebar from '../sidebars/AddressSidebar.svelte';

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

<PrimaryButton on:click={showAddressSidebar} {...$$restProps}>
    {$t("account.addresses.select")}
</PrimaryButton>