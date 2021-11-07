<script>
    import { t } from '$lib/i18n';
    import { shipping, billing, isBillingSameAsShipping } from '$lib/stores'
    import AddressForm from "../form/AddressForm.svelte";
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <AddressForm bind:information={$shipping} title={$t(`checkout.address.${$isBillingSameAsShipping ? "isBillingSameAsShipping" : "shipping"}`)} />
    <label for="isBillingSameAsShipping">
        <input id="isBillingSameAsShipping" name="isBillingSameAsShipping" type="checkbox" bind:checked={$isBillingSameAsShipping} />
        <span class="px-2 text-gray-600">{$t("checkout.address.checkbox")}</span>
    </label>
    {#if !$isBillingSameAsShipping}
        <AddressForm bind:information={$billing} title={$t("checkout.address.billing")} />
    {/if}
</div>