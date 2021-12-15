<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { derived } from 'svelte/store';
    import api from '$lib/api';
    import { t } from '$lib/i18n';
    import { shipping, billing, isBillingSameAsShipping, checkout } from '$lib/stores'
    import AddressForm from "../form/AddressForm.svelte";
    import CheckboxField from '../field/CheckboxField.svelte';

    let checkoutId, countriesAvailableForShipping, isCountryAvailableForShipping = true;
    const dispatch = createEventDispatcher();

    onMount(async () => {
        if ($checkoutId) {
            const res = await api.checkout.getCountries($checkoutId);
            if (res.success) {
                countriesAvailableForShipping = res.countries;
            }
        }
    });

    $: checkoutId = derived(checkout, $checkout => $checkout ? $checkout.id : checkoutId);
    $: isCountryAvailableForShipping = countriesAvailableForShipping?.hasOwnProperty($shipping.country.key);
    $: dispatch("isCountryAvailable", {isCountryAvailableForShipping});
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <AddressForm
        hideSubmitButton
        checkoutId={$checkoutId}
        hideTitleAddress
        bind:information={$shipping}
        title={$t(`checkout.address.${$isBillingSameAsShipping ? "isBillingSameAsShipping" : "shipping"}`)}
    />
    {#if !isCountryAvailableForShipping}
        <span class="text-red-400">{$t("checkout.address.country-not-available")}</span>
    {/if}
    <CheckboxField
        bind:checked={$isBillingSameAsShipping}
        name="isBillingSameAsShipping"
        label={$t("checkout.address.checkbox")}
    />
    {#if !$isBillingSameAsShipping}
        <AddressForm
            hideSubmitButton
            hideTitleAddress
            {checkoutId}
            bind:information={$billing}
            title={$t("checkout.address.billing")}
        />
    {/if}
</div>