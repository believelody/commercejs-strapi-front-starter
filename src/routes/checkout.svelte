<script>
	import { setContext } from 'svelte';
	import { t } from '$lib/i18n';
	import { cart } from '$lib/stores';
	import { getCheckout } from '$lib/actions/checkout';
	import InformationPanel from '../lib/components/checkout/InformationPanel.svelte';
	import CartPanel from '../lib/components/checkout/OrderPanel.svelte';
	import Moon from 'svelte-loading-spinners/dist/ts/Moon.svelte';

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

	$: promise = $cart && getCheckout($cart.id, 'cart');
	// $: {
	// 	if (promise) {
	// 		console.log("in promise");
	// 		promise.then(res => {
	// 			console.log(res);
	// 			setContext("checkout", res);
	// 		});
	// 	}
	// }
</script>

{#if $cart}
	{#await promise}
		<section>
			<Moon size="260" color="#FF3E00" unit="px" />
		</section>
	{:then checkout}
		<div class="flex relative">
			<InformationPanel {checkout} />
			<CartPanel {checkout} />
		</div>
	{:catch error}
		<pre>{JSON.stringify(error)}</pre>
	{/await}
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
