<script>
	import { t } from '$lib/i18n';

	export let loading, checkout;
</script>

<div class="flex justify-between py-4 text-gray-600">
	<span>{$t("checkout.shipping.method")}</span>
	{#if checkout.live.shipping.description}
		<span class="font-semibold text-indigo-500">
			{checkout.live.shipping.description} - {checkout.live.shipping.price.formatted_with_symbol}
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
