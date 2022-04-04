<script>
    import { t } from '$lib/i18n';
    import AddressSidebarButton from '../buttons/AddressSidebarButton.svelte';
    import CreateAddressModalButton from '../buttons/CreateAddressModalButton.svelte';
    import ItemAddress from '../addresses/ItemAddress.svelte';

    export let information, type, items;
</script>

<section class="flex-center-middle flex-col bg-white rounded my-4 border shadow-md w-full xl:w-3/5 py-2">
    <h3 class="border-b w-full py-2 text-center text-lg font-medium">{$t(`account.addresses.${type}.label`)}</h3>
    <div class="py-{information ? 4 : 12} flex-center-middle flex-col">
        {#if information}
            <ItemAddress
                {information}
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