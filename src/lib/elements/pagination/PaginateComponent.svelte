<script>
	import { goto } from '$app/navigation';
	import PaginateNav, { paginate } from './PaginateNav.svelte';

	export let items,
		url,
		pageSize = 10,
		total = 0,
		currentPage;
	let className = "";
	export { className as class };

	$: totalItems = total > 0 ? total : items.length;
	$: paginatedItems = totalItems ? paginate({ items, pageSize, currentPage }) : [];

	function goToPage({ detail }) {
		currentPage = detail.page;
		const newUrl = new URL(url);
		newUrl.searchParams.set("page", detail.page);
		newUrl.searchParams.set("limit", `${pageSize}`);
		goto(newUrl);
	}
</script>

<div class="h-full w-full {className}">
	<slot {paginatedItems} />
</div>
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
{/if}