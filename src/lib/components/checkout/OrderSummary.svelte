<script>
	import { cart } from '$lib/stores';
    import { t } from '$lib/i18n'
    import CartList from '../list/CartList.svelte';
    import ShippingInfo from './ShippingInfo.svelte';
    import TotalCheckout from './TotalCheckout.svelte';

	export let checkout;
	let loading = false;
</script>

<h1 class="py-6 border-b-2 text-xl text-gray-600 px-8">{$t('checkout.summary')}</h1>
<CartList items={checkout.live.line_items} {loading} on:is-loading={e => loading = e.detail} />
<div class="px-8 border-b">
	<div class="flex justify-between py-4 text-gray-600">
		<span>{$t('common.subtotal')}</span>
		<span class="font-semibold text-indigo-500">{checkout.live.subtotal.formatted_with_symbol}</span>
	</div>
	<ShippingInfo {checkout} />
</div>
<TotalCheckout total={checkout.live.total.formatted_with_symbol} />

<style>
	/* your styles go here */
</style>
