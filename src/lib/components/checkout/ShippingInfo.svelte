<script>
	import { t } from '$lib/i18n';

	export let shippingMethod, loading;
</script>

<div class="flex justify-between py-4 text-neutral-dark">
	<span>{$t("checkout.shipping.method")}</span>
	{#if loading}
		<span class="font-semibold text-indigo-500">
			{$t("common.update")}
		</span>
	{:else if shippingMethod.description}
		<span class="font-semibold text-indigo-500">
			{shippingMethod.description} - {shippingMethod.price.formatted_with_symbol}
		</span>
	{:else}
		<span class="font-semibold italic text-sm text-gray-400">
			{$t("checkout.shipping.no-method")}
		</span>
	{/if}
</div>

<style>
	/* your styles go here */
</style>
