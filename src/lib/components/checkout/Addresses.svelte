<script>
    import { t } from '$lib/i18n';
    import { shipping, billing, isBillingSameAsShipping, checkout } from '$lib/stores'
import { onMount } from 'svelte';
    import { derived } from 'svelte/store';
    import AddressForm from "../form/AddressForm.svelte";

    let checkoutId;

    // onMount(() => {
    //     checkoutId = $checkout.id;
    // })

    $: checkoutId = derived(checkout, $checkout => $checkout ? $checkout.id : checkoutId);
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <AddressForm checkoutId={$checkoutId} bind:information={$shipping} title={$t(`checkout.address.${$isBillingSameAsShipping ? "isBillingSameAsShipping" : "shipping"}`)} />
    <label for="isBillingSameAsShipping">
        <input id="isBillingSameAsShipping" name="isBillingSameAsShipping" type="checkbox" bind:checked={$isBillingSameAsShipping} />
        <span class="px-2 text-gray-600">{$t("checkout.address.checkbox")}</span>
    </label>
    {#if !$isBillingSameAsShipping}
        <AddressForm {checkoutId} bind:information={$billing} title={$t("checkout.address.billing")} />
    {/if}
</div>