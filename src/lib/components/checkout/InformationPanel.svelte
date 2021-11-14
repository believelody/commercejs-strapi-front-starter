<script>
    import { t } from '$lib/i18n';
    import { sidebar, shipping, paymentMethod, user, checkout, stripe, paypal } from '$lib/stores';
    import { isAddressValid } from "$lib/utils/address.util";
    import { isUserValid } from "$lib/utils/user.util";
    import OrderSidebar from './OrderSidebar.svelte';
    import Addresses from './Addresses.svelte';
    import Identity from './Identity.svelte';
    import Payment from './Payment.svelte';
    import ArrowRightIcon from '../svg/ArrowRightIcon.svelte';
    import ShippingMethods from './ShippingMethods.svelte';
    import StripePaymentButton from '../button/StripePaymentButton.svelte';
    import PaypalPaymentButton from '../button/PaypalPaymentButton.svelte';

	let cardElement, isCardComplete = false;

    function showSidebar() {
        $sidebar = OrderSidebar
    }

    $: paypalValid = !!(isUserValid($user) && isAddressValid($shipping) && $checkout.live.shipping.id);
    $: stripeValid = !!(paypalValid && $stripe && cardElement && isCardComplete);
</script>

<style>
    /* your styles go here */
</style>

<div class="lg:w-3/5 w-full bg-indigo-50 h-screen flex flex-col">
    <div class="flex items-center justify-end lg:hidden border-b border-indigo-200">
        <button on:click={showSidebar} class="flex items-center hover:bg-indigo-200 px-4 py-2 text-indigo-500 text-md">
            <span class="mr-4">{$t("checkout.check-summary")}</span>
            <ArrowRightIcon color="indigo-400" size={5} />
        </button>
    </div>
    <div class="flex flex-col flex-grow overflow-y-hidden">
        <div class="h-full overflow-y-auto">
            <Identity />
            <Addresses />
            {#if $shipping.country}
                <ShippingMethods />
            {/if}
            <Payment on:isCardComplete={e => isCardComplete = e.detail.complete} bind:cardElement />
        </div>
    </div>
    {#if $paymentMethod === "stripe"}
        <StripePaymentButton isValid={stripeValid} {cardElement} />
    {:else if $paymentMethod === "paypal"}
        <section class="w-full bg-blue-500 {paypalValid ? "pt-2" : "cursor-not-allowed py-4"} text-center">
            {#if paypalValid}
                <PaypalPaymentButton />
            {:else}
                <span class="text-white text-md">{$t("checkout.payment.paypal.not-valid")}</span> 
            {/if}
        </section>
    {/if}
</div>