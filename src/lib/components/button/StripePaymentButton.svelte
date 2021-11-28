<script>
    import { t } from '$lib/i18n';
    import {
        checkout,
        checkoutLoading,
    } from '$lib/stores';
    import StripePaymentModal from '../modal/StripePaymentModal.svelte';
    import {getContext} from "svelte";

    export let cardElement, isValid;
    const { open } = getContext("simple-modal");

    function showModal() {
        open(StripePaymentModal, {
            cardElement
        }, {
            closeButton: false,
            closeOnEsc: false,
            closeOnOuterClick: false,
        });
    }
</script>

<style>
    /* your styles go here */
</style>

<button on:click={showModal} disabled={!isValid} class="px-4 py-4 bg-indigo-600 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">
    {#if $checkoutLoading}
        {$t("common.update")}
    {:else}
        {$t("checkout.submit-stripe", { amount: $checkout.live.total.formatted_with_symbol })}
    {/if}
</button>