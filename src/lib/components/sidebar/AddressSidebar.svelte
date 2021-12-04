<script>
    import { t } from '$lib/i18n';
    import { profile } from '$lib/stores'
    import AddressList from '../list/AddressList.svelte';
    import SidebarWrapper from "./SidebarWrapper.svelte";

    export let type, addAddress;

    $: items = $profile?.addresses.filter(item => item.type === type) ?? [];
</script>

<style>
    /* your styles go here */
</style>

<SidebarWrapper>
    <h2 class="pl-2 py-2 text-center text-lg font-medium text-gray-900" id="slide-over-title">
        {$t(`account.addresses.sidebar.${type}.title`)}
    </h2>
    <div class="w-full border-b border-gray-300 flex items-center justify-center py-2">
        <button on:click={addAddress} class="rounded p-2 bg-indigo-300">+ {$t("account.addresses.add")}</button>
    </div>
    <AddressList {items} {type} />
</SidebarWrapper>