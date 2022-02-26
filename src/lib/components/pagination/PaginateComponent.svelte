<script>
	import { goto } from '$app/navigation';
	import { PaginationNav, paginate } from 'svelte-paginate';

	export let items,
		url,
		pageSize = 15,
		currentPage;

	$: paginatedItems = items.length ? paginate({ items, pageSize, currentPage }) : [];

	function goToPage({ detail }) {
		currentPage = detail.page;
		const newUrl = new URL(url);
		newUrl.searchParams.set("page", detail.page)
		goto(newUrl);
	}
</script>

<div class="h-full w-full">
	<slot {paginatedItems} />
</div>
{#if items.length >= pageSize}
	<section class="flex justify-center my-4 relative bottom-0">
		<PaginationNav
			totalItems={items.length}
			{pageSize}
			{currentPage}
			limit={1}
			showStepOptions
			on:setPage={goToPage}
		/>
	</section>
{/if}

<style>
	:global(.pagination-nav) {
		display: flex;
		justify-content: space-between;
	}
	:global(.number) {
		margin: 0 8px;
		cursor: pointer;
	}
	:global(.prev),
	:global(.next) {
		cursor: pointer;
	}
	:global(.active) {
		text-decoration: underline;
		font-weight: bold;
	}
</style>
