<script>
	import { t } from '$lib/i18n';

	export let total;
</script>

<div class="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
	<span>{$t("common.total")}</span>
	<span>{total}</span>
</div>

<style>
	/* your styles go here */
</style>