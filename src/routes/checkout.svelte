<script>
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { isServer } from 'svelte-stripe-js';
	import { cart, checkout, checkoutLoading, stripe, paypal } from '$lib/stores';
	import { getCheckoutByCart } from '$lib/actions/checkout';
	import Moon from 'svelte-loading-spinners/dist/ts/Moon.svelte';
	import InformationPanel from '../lib/components/checkout/InformationPanel.svelte';
	import OrderPanel from '../lib/components/checkout/OrderPanel.svelte';;

	onMount(async () => {
		if (!isServer) {
			$stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
			
		}
		if ($cart) {
			$checkoutLoading = true;
			getCheckoutByCart($cart.id).finally(() => $checkoutLoading = false);
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
	<section>
		<Moon size="260" color="#FF3E00" unit="px" />
	</section>
{/if}

<style>
	section {
		top: 50%;
		left: 50%;
		position: absolute;
		transform: translate3d(-50%, -50%, 0);
	}
</style>
