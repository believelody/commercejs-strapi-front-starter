<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { t } from '$lib/i18n';
	import { stripe, checkout, paymentMethod } from '$lib/stores';
	import {Card, Container} from 'svelte-stripe-js';
    import Radio from '../../elements/input/RadioInput.svelte';
    import PaypalIcon from '$lib/elements/icon/PaypalIcon.svelte';

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

<div class="mx-2 md:mx-12">
	<h3 class="uppercase tracking-wide font-semibold text-neutral-dark my-2">
		{$t("checkout.payment.title")}
	</h3>
	<section class="bg-white shadow-md rounded text-neutral-dark md:text-lg gird grid-cols-1 divide-y">
		{#if gateways.stripe && $stripe}
			<Radio
				name="paymentMethod"
				value="stripe"
				className="flex items-center px-2 py-3"
				bind:group={$paymentMethod}
			>
				<div class="w-full flex justify-space-between items-center ml-4">
					<span class="w-1/3 md:w-1/2">{$t("checkout.payment.method.stripe")}</span>
					{#if $paymentMethod === "stripe"}
						<div class="flex-grow">
							<Container stripe={$stripe}>
								<Card on:change={e => dispatch("isCardComplete", e.detail)} {style} hidePostalCode bind:element={cardElement} />
							</Container>
						</div>
					{/if}
				</div>
			</Radio>
		{/if}
		<Radio
			name="paymentMethod"
			value="paypal"
			className="flex items-center p-2"
			bind:group={$paymentMethod}
		>
			<div class="w-full flex items-center ml-4">
				<span class="mr-2">{$t("checkout.payment.method.paypal", { amount: $checkout.live.total.formatted_with_code })}</span>
				<PaypalIcon />
			</div>
		</Radio>
	</section>
</div>

<style>
	/* your styles go here */
</style>
