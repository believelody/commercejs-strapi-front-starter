<script>
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { isServer } from 'svelte-stripe-js';
	import { cart, checkout, checkoutLoading, stripe } from '$lib/stores';
	import api from '$lib/api';
	import InformationPanel from '../lib/components/checkout/InformationPanel.svelte';
	import OrderPanel from '../lib/components/checkout/OrderPanel.svelte';
	import MoonLoading from '../lib/components/loading/MoonLoading.svelte';

	onMount(async () => {
		if (!isServer) {
			$stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
			
		}
		if ($cart) {
			$checkoutLoading = true;
			api.checkout.getCheckoutByCart($cart.id).finally(() => $checkoutLoading = false);
		}
	});

	function goBack() {
		if (!window) {
		} else {
			window.history.back();
		}
	}

	$: {
		if (!$cart || $cart.total_unique_items === 0) {
			// goBack();
		}
	}
</script>

{#if $cart && $checkout}
	<div class="flex relative">
		<InformationPanel />
		<OrderPanel />
	</div>
{:else}
	<MoonLoading />
{/if}
