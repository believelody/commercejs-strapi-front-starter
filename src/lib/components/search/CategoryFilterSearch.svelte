<script>
	import { getContext } from 'svelte';
	import { t } from '$lib/i18n';
	import { categories } from '$lib/stores';
	import Card from '../../elements/card/Card.svelte';
	import MoonLoading from '../loading/MoonLoading.svelte';
</script>

<Card>
	<h3 slot="header">{$t('menu.categories.label')}</h3>
	<ul slot="content">
		{#each $categories as category}
			<li>
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
		@apply py-4 grid grid-cols-1 gap-y-1 divide-y;
	}
	li {
		@apply btn-link w-full px-4 py-1 flex;
	}
</style>
