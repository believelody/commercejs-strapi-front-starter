<script>
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n';
	import { stripe } from '$lib/stores';
	import { Card, Container } from 'svelte-stripe-js';
	import BankCardIcon from '../svg/BankCardIcon.svelte';

	const dispatch = createEventDispatcher();
	export let cardElement;
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
</script>

<div class="mx-2 md:mx-12 rounded-md">
	<h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
		{$t("checkout.payment.title")}
	</h2>
	<fieldset class="mb-3 py-2 pl-2 bg-white shadow-lg rounded text-gray-600">
		<!-- <label class="flex border-b border-gray-200 h-12 py-3 items-center">
			<span class="text-right px-2">
				<BankCardIcon />
			</span>
			<input
				name="card"
				class="focus:outline-none px-3 w-full"
				placeholder="{$t("checkout.payment.card-number")} MM/YY CVC"
				required=""
			/>
		</label> -->
		{#if $stripe}
			<Container stripe={$stripe}>
				<Card on:change={e => dispatch("is-card-complete", e.detail)} {style} hidePostalCode class="border-b border-gray-200 h-12 py-3 focus:outline-none px-3 w-full" bind:element={cardElement} />
			</Container>
		{/if}
	</fieldset>
</div>

<style>
	/* your styles go here */
</style>
