<script>
    import { t } from '$lib/i18n';
    import { profile } from '$lib/stores'
    import AddressList from '../list/AddressList.svelte';
    import SidebarWrapper from "$elements/sidebar/SidebarWrapper.svelte";
    import CreateAddressModalButton from '../buttons/CreateAddressModalButton.svelte';

    export let type;
    let loading = false;

    $: items = $profile?.addresses.filter(item => item.type === type) ?? [];
</script>

<style>
    /* your styles go here */
</style>

<SidebarWrapper>
    <h3 slot="header" class="py-2 text-center font-medium text-neutral-dark">
        {$t(`account.addresses.sidebar.${type}.title`)}
    </h3>
    <div slot="extra" class="w-full border-b order-last border-neutral-300 flex items-center justify-center py-2">
        <div class="mt-2">
            <CreateAddressModalButton
                {type}
                withoutShadow
                disabled={loading}
            />
        </div>
    </div>
    <AddressList slot="content" {items} {type} on:loading={({ detail }) => loading = detail.loading} />
</SidebarWrapper>