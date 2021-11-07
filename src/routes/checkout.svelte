<script>
	import { cart } from '$lib/stores';
	import { getCheckout } from '$lib/actions/checkout';
	import Wrapper from '../lib/components/checkout/Wrapper.svelte';
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
</script>

{#if $cart}
	{#await promise}
		<section>
			<Moon size="260" color="#FF3E00" unit="px" />
		</section>
	{:then checkout}
		<Wrapper {checkout} />
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
