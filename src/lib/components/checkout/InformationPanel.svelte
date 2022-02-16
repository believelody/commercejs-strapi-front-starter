<script>
	import { t } from '$lib/i18n';
	import {
		sidebar,
		shipping,
		paymentMethod,
		guest,
		profile,
		jwt,
		checkout,
		stripe
	} from '$lib/stores';
	import { requiredFieldsValidation, emailValidation } from '$lib/utils/form.util';
	import OrderSidebar from './OrderSidebar.svelte';
	import Addresses from './Addresses.svelte';
	import Identity from './Identity.svelte';
	import Payment from './Payment.svelte';
	import ArrowRightIcon from '$lib/elements/icon/ArrowRightIcon.svelte';
	import ShippingMethods from './ShippingMethods.svelte';
	import StripePaymentButton from '../buttons/StripePaymentButton.svelte';
	import PaypalPaymentButton from '../buttons/PaypalPaymentButton.svelte';
	import DiscountForm from '../forms/DiscountForm.svelte';
	import PrimaryButton from '../../elements/button/PrimaryButton.svelte';

	let cardElement,
		isCountryAvailable = true,
		isCardComplete = false;

	function showSidebar() {
		$sidebar = {
            component: OrderSidebar,
            noCloseBtn: true,
        };
	}

	$: checkoutValid = !!(
		requiredFieldsValidation($jwt ? $profile?.customer : $guest, ['firstname', 'email']) &&
		emailValidation($profile?.customer.email ?? $guest?.email) &&
		requiredFieldsValidation($shipping, ['address1', 'city', 'zip', 'country']) &&
		isCountryAvailable &&
		$checkout.live.shipping.id
	);
	$: stripeValid = !!(checkoutValid && $stripe && cardElement && isCardComplete);
</script>

<div class="bg-indigo-50 lg:col-span-2 h-screen grid grid-cols-1">
	<div class="flex items-center justify-end lg:hidden border-b border-indigo-200">
		<PrimaryButton outlined on:click={showSidebar}>
			<span class="mr-4">{$t('checkout.check-summary')}</span>
			<ArrowRightIcon color="indigo-400" size={5} />
		</PrimaryButton>
	</div>
	<div class="overflow-y-hidden">
		<div class="h-full grid grid-cols-1 gap-8 pb-4 overflow-y-auto">
			<Identity />
			<DiscountForm />
			<Addresses
				on:isCountryAvailable={({ detail }) =>
					(isCountryAvailable = detail.isCountryAvailableForShipping)}
			/>
			{#if $shipping?.country}
				<ShippingMethods />
			{/if}
			<Payment on:isCardComplete={(e) => (isCardComplete = e.detail.complete)} bind:cardElement />
		</div>
	</div>
	{#if $paymentMethod === 'stripe'}
		<StripePaymentButton isValid={stripeValid} {cardElement} />
	{:else if $paymentMethod === 'paypal'}
		<section
			class="w-full bg-blue-500 {checkoutValid ? 'pt-2' : 'cursor-not-allowed py-4'} text-center"
		>
			{#if checkoutValid}
				<PaypalPaymentButton />
			{:else}
				<span class="text-white text-md">{$t('checkout.payment.paypal.not-valid')}</span>
			{/if}
		</section>
	{/if}
</div>

<style>
	/* your styles go here */
</style>
