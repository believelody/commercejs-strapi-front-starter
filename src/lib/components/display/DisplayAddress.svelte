<script>
    import { t } from '$lib/i18n';
    import AddressSidebarButton from '../button/AddressSidebarButton.svelte';
    import CreateAddressModalButton from '../button/CreateAddressModalButton.svelte';
    import AddressItem from '../addresses/AddressItem.svelte';

    export let information, type, items;
</script>

<section class="flex flex-col bg-white rounded my-4 justify-center border shadow-md w-full xl:w-3/5 items-center">
    <h3 class="border-b w-full py-2 text-center text-lg font-medium">{$t(`account.addresses.${type}.label`)}</h3>
    <div class="py-{information ? 4 : 12} flex flex-col justify-center items-center">
        {#if information}
            <AddressItem
                {information}
                {items}
                primary="update"
                secondary="select"
            />
        {:else}
            <span>{$t("account.addresses.no-address")}</span>
            <div class="mt-2">
                <CreateAddressModalButton {type} withoutShadow />
            </div>
            {#if items.length}
                <div class="mt-2">
                    <AddressSidebarButton {type} />
                </div>
            {/if}
        {/if}
    </div>
</section>