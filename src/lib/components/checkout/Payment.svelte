<script>
	import { t } from '$lib/i18n';
	import { stripe } from '$lib/stores';
import { CardCvc, CardExpiry, CardNumber, Container } from 'svelte-stripe-js';
	import BankCardIcon from '../svg/BankCardIcon.svelte';

	export let cardElement;
</script>

<div class="mx-2 md:mx-12 rounded-md">
	<h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
		{$t("checkout.payment.title")}
	</h2>
	<fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
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
				<CardNumber bind:element={cardElement}/>
				<CardExpiry />
				<CardCvc />
			</Container>
		{/if}
	</fieldset>
</div>

<style>
	/* your styles go here */
</style>
