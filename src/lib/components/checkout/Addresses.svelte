<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { derived } from 'svelte/store';
    import api from '$lib/api';
    import { t } from '$lib/i18n';
    import { shipping, billing, isBillingSameAsShipping, checkout, jwt } from '$lib/stores';
    import AddressForm from "../forms/AddressForm.svelte";
    import CheckboxInput from '../../elements/input/CheckboxInput.svelte';
    import AddressSidebarButton from '../buttons/AddressSidebarButton.svelte';

    let checkoutId, countriesAvailableForShipping, isCountryAvailableForShipping = null;
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
    $: isCountryAvailableForShipping = countriesAvailableForShipping?.hasOwnProperty($shipping?.country?.key);
    $: dispatch("isCountryAvailable", {isCountryAvailableForShipping});
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12">
    <AddressForm
        hideSubmitButton
        hideTitleAddress
        contentClass="md:text-lg"
        {checkoutId}
        bind:information={$shipping}
        title={$t(`checkout.address.${$isBillingSameAsShipping ? "isBillingSameAsShipping" : "shipping"}`)}
    />
    {#if $shipping?.country && isCountryAvailableForShipping === false}
        <span class="text-red-400">{$t("checkout.address.country-not-available")}</span>
    {/if}
    <div class="flex flex-col md:flex-row-reverse md:justify-between md:items-center">
        {#if $jwt}
            <div class="flex align-center justify-end mt-2">
                <AddressSidebarButton type="shipping" />
            </div>
        {/if}
        <CheckboxInput
            bind:checked={$isBillingSameAsShipping}
            name="isBillingSameAsShipping"
            label={$t("checkout.address.checkbox")}
        />
    </div>
    {#if !$isBillingSameAsShipping}
        <AddressForm
            hideSubmitButton
            hideTitleAddress
            headerClass="mt-4"
            contentClass="md:text-lg"
            {checkoutId}
            bind:information={$billing}
            title={$t("checkout.address.billing")}
        />
        {#if $jwt}
            <div class="flex align-center justify-end mt-2">
                <AddressSidebarButton type="billing" />
            </div>
        {/if}
    {/if}
</div>