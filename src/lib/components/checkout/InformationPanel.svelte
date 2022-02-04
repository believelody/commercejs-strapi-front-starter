<script>
    import { t } from '$lib/i18n';
    import { sidebar, shipping, paymentMethod, guest, profile, jwt, checkout, stripe } from '$lib/stores';
    import { requiredFieldsValidation, emailValidation } from "$lib/utils/form.util";
    import OrderSidebar from './OrderSidebar.svelte';
    import Addresses from './Addresses.svelte';
    import Identity from './Identity.svelte';
    import Payment from './Payment.svelte';
    import ArrowRightIcon from '../svg/ArrowRightIcon.svelte';
    import ShippingMethods from './ShippingMethods.svelte';
    import StripePaymentButton from '../button/StripePaymentButton.svelte';
    import PaypalPaymentButton from '../button/PaypalPaymentButton.svelte';
    import Discount from '../discount/Discount.svelte';

	let cardElement, isCountryAvailable = true, isCardComplete = false;

    function showSidebar() {
        $sidebar = OrderSidebar;
    }

    $: checkoutValid = !!(
        requiredFieldsValidation($jwt ? $profile?.customer : $guest, ["firstname", "email"]) &&
        emailValidation($profile?.customer.email ?? $guest?.email) &&
        requiredFieldsValidation($shipping, ["address1", "city", "zip", "country"]) &&
        isCountryAvailable &&
        $checkout.live.shipping.id
    );
    $: stripeValid = !!(checkoutValid && $stripe && cardElement && isCardComplete);
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
    <div class="flex flex-col grow overflow-y-hidden">
        <div class="h-full overflow-y-auto">
            <Identity />
            <Discount />
            <Addresses on:isCountryAvailable={({ detail }) => isCountryAvailable = detail.isCountryAvailableForShipping} />
            {#if $shipping?.country}
                <ShippingMethods />
            {/if}
            <Payment on:isCardComplete={e => isCardComplete = e.detail.complete} bind:cardElement />
        </div>
    </div>
    {#if $paymentMethod === "stripe"}
        <StripePaymentButton isValid={stripeValid} {cardElement} />
    {:else if $paymentMethod === "paypal"}
        <section class="w-full bg-blue-500 {checkoutValid ? "pt-2" : "cursor-not-allowed py-4"} text-center">
            {#if checkoutValid}
                <PaypalPaymentButton />
            {:else}
                <span class="text-white text-md">{$t("checkout.payment.paypal.not-valid")}</span> 
            {/if}
        </section>
    {/if}
</div>