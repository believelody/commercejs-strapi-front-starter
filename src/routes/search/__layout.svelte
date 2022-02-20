<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { categories } from '$lib/stores';
	import FilterPanelSearch from '../../lib/components/search/FilterPanelSearch.svelte';

	const filters = writable({ prices: [], categories: [], colors: [], sizes: [] });
	setContext('filters', filters);
</script>

<div class="bg-primary-light-1">
	<div class="layout">
		<aside>
			<div class="aside-filter">
				<FilterPanelSearch />
			</div>
		</aside>
		<article>
			<slot />
		</article>
	</div>
</div>

<style>
	@import '../../styles/tailwind.css';

	.layout {
		@apply relative container mx-auto grid grid-cols-3 gap-4 flex-grow lg:flex-grow-0 py-4;
	}

	aside {
		@apply hidden relative lg:flex lg:flex-col lg:col-span-1;
	}

	.aside-filter {
		@apply sticky top-0 grid grid-cols-1 gap-y-4;
	}

	article {
		@apply relative bg-white lg:col-start-2 lg:col-span-2 flex flex-col items-center rounded lg:shadow-lg pb-0 lg:pb-4;
	}
</style>
