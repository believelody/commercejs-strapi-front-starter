<script>
    import { t } from "$lib/i18n";

	export let categories, meta, collapse;
</script>

<nav>
	{#each categories as item}
		<a href="/categories/{item.slug}">
			{item.name}
		</a>
	{/each}
	<a href="/products">
		{$t('menu.categories.all.label')}
	</a>
</nav>

<style>
	@import '../../../styles/tailwind.css';

    nav {
        @apply w-full md:w-48 md:border-2 md:rounded text-left grid grid-cols-1 divide-y text-neutral-dark bg-neutral-light-2 md:bg-white
    }

    a {
        @apply p-2 text-left bg-white btn-link flex items-center;
    }
</style>
