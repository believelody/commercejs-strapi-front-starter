<script>
	import { checkout, checkoutLoading, sidebar } from '$lib/stores';
    import { t } from '$lib/i18n'
    import CartList from '../list/CartList.svelte';
    import ShippingInfo from './ShippingInfo.svelte';
	import DiscountDisplay from '../displays/DiscountDisplay.svelte';
    import TotalCheckout from './TotalCheckout.svelte';
	import CloseButton from '../buttons/CloseButton.svelte';

	let cartLoading = false;
</script>

<h3 class="text-center py-4 text-neutral-dark px-8 border-b">
	<span>{$t('checkout.summary')}</span>
</h3>
<CartList
	on:loading={(e) => cartLoading = e.detail}
	items={$checkout.live.line_items}
	loading={cartLoading}
/>
<div class="px-8 border-b">
	<div class="flex justify-between py-4 text-neutral-dark">
		<span>{$t('common.subtotal')}</span>
		<span class="font-semibold text-indigo-500">{cartLoading ? $t("common.update") : $checkout.live.subtotal.formatted_with_symbol}</span>
	</div>
	<ShippingInfo loading={$checkoutLoading} shippingMethod={$checkout.live.shipping} />
	<DiscountDisplay />
</div>
<TotalCheckout loading={$checkoutLoading || cartLoading} total={$checkout.live.total.formatted_with_symbol} />

<style>
	@import "'../../../styles/tailwind.css";
</style>
