<script>
	import { t } from '$lib/i18n';

	export let total, loading;
</script>

<div class="font-semibold text-xl px-8 flex justify-between py-8 text-neutral-dark">
	<span>{$t("common.total")}</span>
	<span>{loading ? $t("common.update") : total}</span>
</div>

<style>
	/* your styles go here */
</style>