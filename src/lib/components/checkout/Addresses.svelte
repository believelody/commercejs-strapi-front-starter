<script>
    import { t } from '$lib/i18n';
    import AddressForm from "../form/AddressForm.svelte";

    let both = true, shipping = {}, billing = {};

    $: console.log("shipping", shipping);
    $: console.log("billing", billing);
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <AddressForm bind:information={shipping} title={$t(`checkout.address.${both ? "both" : "shipping"}`)} />
    <label for="both">
        <input id="both" name="both" type="checkbox" class:checked={both} bind:checked={both} />
        <span class="px-2 text-gray-600">{$t("checkout.address.checkbox")}</span>
    </label>
    {#if !both}
        <AddressForm bind:information={billing} title={$t("checkout.address.billing")} />
    {/if}
</div>