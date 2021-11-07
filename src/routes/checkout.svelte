<script>
	import { cart, checkout } from '$lib/stores';
	import { getCheckout } from '$lib/actions/checkout';
	import Moon from 'svelte-loading-spinners/dist/ts/Moon.svelte';
import InformationPanel from '../lib/components/checkout/InformationPanel.svelte';
import OrderPanel from '../lib/components/checkout/OrderPanel.svelte';
import { onMount } from 'svelte';

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

	$: $cart && getCheckout($cart.id, "cart").then(res => $checkout = res);
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
