<script>
	import SearchProductsForm from '../forms/SearchProductsForm.svelte';

	export let noIcon = false, transparent = false, withoutShadow = false;
</script>

<SearchProductsForm {noIcon} {transparent} {withoutShadow} />
