<script>
	import { page } from '$app/stores';
	import PaginateComponent from '../../elements/pagination/PaginateComponent.svelte';
	import ItemProduct from './ItemProduct.svelte';

	export let products, meta, withoutPadding = false;
</script>

<section class="text-neutral-dark body-font">
	<div class="container {withoutPadding ? '' : 'md:px-5 md:py-24'} mx-auto">
		<PaginateComponent
			let:paginatedItems
			items={products}
			url={$page.url.href}
			currentPage={+$page.url.searchParams.get('page') || 1}
			pageSize={6}
		>
			<ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each paginatedItems as product}
					<ItemProduct {product} />
				{/each}
			</ul>
		</PaginateComponent>
	</div>
</section>
