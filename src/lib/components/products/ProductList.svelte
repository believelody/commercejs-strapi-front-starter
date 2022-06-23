<script>
	import { page } from '$app/stores';
	import { t } from '$lib/i18n';
	import CenterSection from '$elements/center-section/CenterSection.svelte';
	import ItemProduct from './ItemProduct.svelte';
	import PaginateMeta from '$lib/elements/pagination/PaginateMeta.svelte';

	export let products,
		meta,
		withoutPadding = false;
</script>

<section class="text-neutral-dark body-font h-full">
	<div
		class="container box-border {withoutPadding
			? 'pb-4'
			: 'md:px-5 md:py-24'} mx-auto flex flex-col  h-full"
	>
		{#if products.length}
			<PaginateMeta
				let:paginatedItems
				items={products}
				url={$page.url.href}
				currentPage={+$page.url.searchParams.get('page') || 1}
				{meta}
			>
				<ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{#each paginatedItems as product}
						<ItemProduct {product} />
					{/each}
				</ul>
			</PaginateMeta>
			<!-- <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each products as product}
					<ItemProduct {product} />
				{/each}
			</ul>
			{#if totalItems > pageSize}
				<section class="flex justify-center my-4 relative bottom-0">
					<PaginateNav
						{totalItems}
						{pageSize}
						{currentPage}
						limit={1}
						showStepOptions
						on:setPage={goToPage}
					/>
				</section>
			{/if} -->
		{:else}
			<CenterSection>
				<span>{$t('product.list.empty')}</span>
			</CenterSection>
		{/if}
	</div>
</section>
