<script>
	import { goto } from '$app/navigation';
	import PaginateNav from './PaginateNav.svelte';

	export let items,
		url,
		meta,
        pageSize = 10,
		currentPage;
	let className = "";
	export { className as class };

	const totalItems = meta.pagination.total || items.length;

	function goToPage({ detail }) {
		currentPage = detail.page;
		const newUrl = new URL(url);
		newUrl.searchParams.set("page", detail.page);
		newUrl.searchParams.set("limit", `${pageSize}`);
		goto(newUrl);
	}
</script>

<div class="h-full w-full {className}">
	<slot paginatedItems={items} />
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