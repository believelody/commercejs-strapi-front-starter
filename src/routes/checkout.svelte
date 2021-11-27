<script>
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { isServer } from 'svelte-stripe-js';
	import { cart, checkout, checkoutLoading, stripe } from '$lib/stores';
	import api from '$lib/api';
	import Moon from 'svelte-loading-spinners/dist/ts/Moon.svelte';
	import InformationPanel from '../lib/components/checkout/InformationPanel.svelte';
	import OrderPanel from '../lib/components/checkout/OrderPanel.svelte';;
import Loading from '../lib/components/loading/Loading.svelte';

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
	<Loading>
		<Moon size="260" color="#FF3E00" unit="px" />
	</Loading>
{/if}
