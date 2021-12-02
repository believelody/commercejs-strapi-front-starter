<script context="module">
    import { t } from "$lib/i18n";
    import { profile } from "$lib/stores";
    import api from "$lib/api";

    export async function load() {
        const { addresses } = await api.address.getAll();
        return {
            props: { addresses }
        }
    }
</script>

<script>
    import DisplayAddress from "../../../lib/components/display/DisplayAddress.svelte";

    export let addresses = [];

    $: shippings = addresses.filter(address => address.type === "shipping");
    $: billings = addresses.filter(address => address.type === "billing");
</script>

<div class="flex flex-col">
    <h2 class="text-center text-xl font-semibold text-gray-600 pt-4 pb-2">{$t("account.addresses.title")}</h2>
    <DisplayAddress noAddresses={!shippings?.length} type="shipping" information={$profile.customer?.shipping} />
    <DisplayAddress noAddresses={!billings?.length} type="billing" information={$profile.customer?.billing} />
</div>