<script context="module">
    import api from "$lib/api";

    export async function load() {
        const { addresses } = await api.address.getAll();
        return {
            props: { addresses }
        }
    }
</script>

<script>
    import { t } from "$lib/i18n";
    import { profile } from "$lib/stores";
    import DisplayAddress from "../../../lib/components/display/DisplayAddress.svelte";
    import HeaderTitle from "../../../lib/components/header/HeaderTitle.svelte";

    export let addresses;

    $: shippings = addresses ? addresses.filter(address => address.type === "shipping") : [];
    $: billings = addresses ? addresses.filter(address => address.type === "billing") : [];
</script>

<div class="flex flex-col items-center px-4 xl:px-0">
    <HeaderTitle title={$t("account.addresses.title")} />
    <DisplayAddress type="shipping" information={$profile?.customer.meta.shipping} />
    <DisplayAddress type="billing" information={$profile?.customer.meta.billing} />
</div>