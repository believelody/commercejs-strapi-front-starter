<script>
	import { getContext } from 'svelte';
	import { t } from '$lib/i18n';
	import Button from '../../elements/button/Button.svelte';
	import ItemProduct from '../products/ItemProduct.svelte';

	export let products,
		filteredProducts = products;
	const filters = getContext('filters');

	function applyFilter(key, value) {
		switch (key) {
			case 'prices':
				return filteredProducts.filter(
					(product) => product.price.raw >= value[0] && product.price.raw <= value[1]
				);
			case 'category':
				return filteredProducts.filter((product) =>
					product.categories.some((category) => category.name.toLowerCase() === value.toLowerCase())
				);
			default:
				return [];
		}
	}

	$: {
		if ($filters.size) {
			filteredProducts = products;
			$filters.forEach((v, k, map) => {
				if (v.length || v) {
					filteredProducts = applyFilter(k, v);
				}
			});
		} else {
			filteredProducts = products;
		}
	}

	$: console.log(filteredProducts);
</script>

<h2>
	{$t(`product.search.page.header.${filteredProducts.length === 1 ? 'singular' : 'plural'}`, {
		number: filteredProducts.length
	})}
</h2>
<div class="product-list">
	{#each filteredProducts as item}
		<ItemProduct product={item} />
	{/each}
</div>

<style>
	@import '../../../styles/tailwind.css';

	h2 {
		@apply py-4;
	}
	.product-list {
		@apply list-none p-4 w-full grid grid-cols-3 items-center gap-4;
	}
</style>
