<script>
	import { getContext } from 'svelte';
	import { t } from '$lib/i18n';
	import { categories } from '$lib/stores';
	import Card from '../../elements/card/Card.svelte';
	import MoonLoading from '../loading/MoonLoading.svelte';

	const filters = getContext("filters");

	function selectFilterCategory(value) {
		if ($filters.has("category") && $filters.get("category") === value) {
			let updatedFilters = $filters;
			updatedFilters.delete("category");
			$filters = updatedFilters;
		} else {
			$filters = $filters.set("category", value);
		}
	}
</script>

<Card>
	<h3 slot="header">{$t('menu.categories.label')}</h3>
	<ul slot="content">
		{#each $categories as category}
			<li class:selected={$filters.get("category") === category.name} on:click={() => selectFilterCategory(category.name)}>
				{category.name}
			</li>
		{:else}
			<MoonLoading />
		{/each}
	</ul>
</Card>

<style>
	@import '../../../styles/tailwind.css';

	h3 {
		@apply p-4 border-b-2 border-neutral;
	}
	ul {
		@apply grid grid-cols-1 divide-y;
	}
	li {
		@apply btn-link w-full p-4 flex;
	}
	.selected {
		@apply bg-neutral text-white;
	}
</style>
