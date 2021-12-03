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

    export let addresses;

    $: shippings = addresses ? addresses.filter(address => address.type === "shipping") : [];
    $: billings = addresses ? addresses.filter(address => address.type === "billing") : [];
</script>

<div class="flex flex-col items-center px-4 xl:px-0">
    <h2 class="text-xl font-semibold text-gray-600 mt-4 mb-2">{$t("account.addresses.title")}</h2>
    <DisplayAddress type="shipping" information={$profile.customer.meta.shipping} />
    <DisplayAddress type="billing" information={$profile.customer.meta.billing} />
</div>