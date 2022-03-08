<script>
	import { page } from '$app/stores';
	import { t } from "$lib/i18n";
	import CenterSection from '../../elements/center-section/CenterSection.svelte';
	import PaginateComponent from '../../elements/pagination/PaginateComponent.svelte';
	import ItemProduct from './ItemProduct.svelte';

	export let products, meta, withoutPadding = false;
</script>

<section class="text-neutral-dark body-font h-full">
	<div class="container box-border {withoutPadding ? 'pb-4' : 'md:px-5 md:py-24'} mx-auto flex flex-col  h-full">
		{#if products.length}
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
		{:else}
			<CenterSection>
				<span>{$t('product.list.empty')}</span>
			</CenterSection>
		{/if}
	</div>
</section>
