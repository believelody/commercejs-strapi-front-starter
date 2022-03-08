<script>
	import { getContext } from 'svelte';
	import PaginationNav from 'svelte-paginate/src/PaginationNav.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n';
	import Button from '../../elements/button/Button.svelte';
	import ItemProduct from '../products/ItemProduct.svelte';
	import PaginateComponent from '../../elements/pagination/PaginateComponent.svelte';

	export let products, word, filteredProducts = products;
	let pageSizes = [6, 15, 24],
		pageSize = pageSizes[0];
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
			case 'color':
				return filteredProducts.filter((product) => {
					let colorVariant = product.variants.find(
						(variant) => variant.name.toLowerCase() === $t('variants.color.name').toLowerCase()
					);
					if (colorVariant) {
						return colorVariant.options.some(
							(option) =>
								option.name.toLowerCase() === value ||
								option.name.toLowerCase().includes($t(`common.color.${value}`))
						);
					}
					return product.name.toLowerCase().includes($t(`common.color.${value}`));
				});
			case 'size':
				return filteredProducts.filter((product) => {
					let sizeVariant = product.variants.find(
						(variant) => variant.name.toLowerCase() === $t('variants.size.name').toLowerCase()
					);
					return sizeVariant
						? sizeVariant.options.some((option) => {
								return option.name.toLowerCase() === value;
						  })
						: null;
				});
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
</script>

<h3 class="p-2 py-4 text-center lg:p-0">
	{@html $t(`product.search.page.header.${filteredProducts.length === 1 ? 'singular' : 'plural'}`, {
		number: filteredProducts.length,
		word
	})}
</h3>
<section class="box-border w-full flex items-center">
	<div class="px-4 md:px-8">
		<b>{$t('product.search.page.nb-items.label')}</b>
	</div>
	<ul class="grid grid-cols-3 gap-x-2 items-center">
		{#each pageSizes as size}
			<li>
				<Button
					class="w-24 disabled:text-neutral {pageSize === size && filteredProducts.length >= size ? 'border-2 border-neutral bg-white' : ''}"
					on:click={() => (pageSize = size)}
					disabled={filteredProducts.length < size}
				>
					<span>{size}</span>
				</Button>
			</li>
		{/each}
	</ul>
</section>
<PaginateComponent
	let:paginatedItems
	items={filteredProducts}
	url={$page.url.href}
	{pageSize}
	currentPage={+$page.url.searchParams.get('page') || 1}
>
	<div class="product-list">
		{#each paginatedItems as item}
			<ItemProduct product={item} />
		{/each}
	</div>
</PaginateComponent>

<style>
	@import '../../../styles/tailwind.css';

	h2 {
		@apply py-4;
	}
	.product-list {
		@apply list-none p-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4;
	}
</style>
