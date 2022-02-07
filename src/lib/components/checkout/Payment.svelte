<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { t } from '$lib/i18n';
	import { stripe, checkout, paymentMethod } from '$lib/stores';
	import { Card, Container } from 'svelte-stripe-js';
	import RadioField from '../field/RadioField.svelte';
	import PaypalIcon from '../svg/PaypalIcon.svelte';

	export let cardElement;

	const dispatch = createEventDispatcher();
	const { gateways } = $checkout;

	let style = {
		base: {
			fontSize: '16px',
			'::placeholder': {
				color: '#aaaaaa'
			},
		},
		invalid: {
			color: '#fa755a',
		}
	};

	onMount(async () => {
		$paymentMethod = "stripe";
	})
</script>

<div class="mx-2 md:mx-12 rounded-md">
	<h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
		{$t("checkout.payment.title")}
	</h2>
	<fieldset class="mb-3 py-2 pl-2 bg-white shadow-lg rounded text-gray-600">
		{#if gateways.stripe && $stripe}
			<RadioField
				name="paymentMethod"
				value="stripe"
				className="flex items-center pb-2 border-b border-gray-300"
				bind:group={$paymentMethod}
			>
				<div class="w-full flex justify-space-between items-center ml-4">
					<span class="w-1/2">{$t("checkout.payment.method.stripe")}</span>
					{#if $paymentMethod === "stripe"}
						<div class="flex-grow">
							<Container stripe={$stripe}>
								<Card on:change={e => dispatch("isCardComplete", e.detail)} {style} hidePostalCode bind:element={cardElement} />
							</Container>
						</div>
					{/if}
				</div>
			</RadioField>
		{/if}
		<RadioField
			name="paymentMethod"
			value="paypal"
			className="flex items-center pt-2"
			bind:group={$paymentMethod}
		>
			<div class="w-full flex items-center ml-4">
				<span class="mr-2">{$t("checkout.payment.method.paypal", { amount: $checkout.live.total.formatted_with_code })}</span>
				<PaypalIcon />
			</div>
		</RadioField>
	</fieldset>
</div>

<style>
	/* your styles go here */
</style>
