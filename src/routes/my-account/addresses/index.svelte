<script>
    import { t } from "$lib/i18n";
    import { profile } from "$lib/stores";
    import DisplayAddress from "$lib/components/display/DisplayAddress.svelte";
    import HeaderTitle from "$lib/components/header/HeaderTitle.svelte";

    $: addresses = $profile && $profile.addresses;
    $: shippings = addresses ? addresses.filter(address => address.type === "shipping") : [];
    $: billings = addresses ? addresses.filter(address => address.type === "billing") : [];
</script>

<div class="flex flex-col bg-gray-200 h-full items-center px-4 xl:px-0">
    <HeaderTitle title={$t("account.addresses.title")} />
    <DisplayAddress items={shippings} type="shipping" information={$profile?.customer.meta.shipping} />
    <DisplayAddress items={billings} type="billing" information={$profile?.customer.meta.billing} />
</div>