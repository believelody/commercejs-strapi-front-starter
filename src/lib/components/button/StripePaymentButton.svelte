<script>
    import { t } from '$lib/i18n';
    import { bind } from 'svelte-simple-modal';
    import {
        checkout,
        checkoutLoading,
        modal
    } from '$lib/stores';
    import StripePaymentModal from '../modal/StripePaymentModal.svelte';

    export let cardElement, isValid;

    function showModal() {
        modal.set({
            show: bind(StripePaymentModal, {
                cardElement
            }),
            closeButton: false,
            closeOnEsc: false,
            closeOnOuterClick: false,
        })
    }
</script>

<style>
    /* your styles go here */
</style>

<button on:click={showModal} disabled={!isValid} class="px-4 py-4 bg-indigo-600 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors disabled:opacity-75 disabled:cursor-not-allowed">
    {#if $checkoutLoading}
        {$t("common.update")}
    {:else}
        {$t("checkout.submit-stripe", { amount: $checkout.live.total.formatted_with_symbol })}
    {/if}
</button>