<script>
	import { goto } from '$app/navigation';
	import PaginateNav, { paginate } from './PaginateNav.svelte';

	export let items,
		url,
		pageSize = 15,
		currentPage;
	let className;
	export { className as class };
	$: paginatedItems = items.length ? paginate({ items, pageSize, currentPage }) : [];

	function goToPage({ detail }) {
		currentPage = detail.page;
		const newUrl = new URL(url);
		newUrl.searchParams.set("page", detail.page)
		goto(newUrl);
	}
</script>

<div class="h-full w-full {className}">
	<slot {paginatedItems} />
</div>
{#if items.length > pageSize}
	<section class="flex justify-center my-4 relative bottom-0">
		<PaginateNav
			totalItems={items.length}
			{pageSize}
			{currentPage}
			limit={1}
			showStepOptions
			on:setPage={goToPage}
		/>
	</section>
{/if}