<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { categories } from '$lib/stores';
	import FilterPanelSearch from '../../lib/components/search/FilterPanelSearch.svelte';

	const filters = writable(new Map());
	setContext('filters', filters);
</script>

<div class="bg-primary-light-2 h-full">
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
		@apply relative container h-full mx-auto flex flex-col lg:grid lg:grid-cols-3 lg:py-4;
	}

	aside {
		@apply relative sticky top-0 z-50 lg:z-0 lg:flex lg:flex-col lg:col-span-1;
	}

	.aside-filter {
		@apply lg:sticky lg:top-0 grid grid-cols-1 gap-y-4;
	}

	article {
		@apply z-0 relative h-full lg:col-start-2 lg:col-span-2 flex flex-col;
	}
</style>
