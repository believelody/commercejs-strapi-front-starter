<script>
	import VariantList from '../list/VariantList.svelte';

	export let variantGroup, selectedOption;
</script>

<VariantList on:selectOption {variantGroup} {selectedOption} type="color" shape="circle" />
