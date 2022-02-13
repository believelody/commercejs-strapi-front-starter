<script>
    import { t } from "$lib/i18n";
    import { profile } from "$lib/stores";
    import AddressDisplay from "../../../lib/components/displays/AddressDisplay.svelte";
    import HeaderTitle from "../../../lib/components/header/HeaderTitle.svelte";

    $: addresses = $profile && $profile.addresses;
    $: shippings = addresses ? addresses.filter(address => address.type === "shipping") : [];
    $: billings = addresses ? addresses.filter(address => address.type === "billing") : [];
</script>

<HeaderTitle title={$t("account.addresses.title")} />
<AddressDisplay items={shippings} type="shipping" information={$profile?.customer.meta?.shipping} />
<AddressDisplay items={billings} type="billing" information={$profile?.customer.meta?.billing} />