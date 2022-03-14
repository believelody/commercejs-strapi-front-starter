<script>
	import { navigating, page } from '$app/stores';
	import api from '$api';
	import { t } from '$lib/i18n';
	import MoonLoading from '$components/loading/MoonLoading.svelte';
	import ResultPanelSearch from '$components/search/ResultPanelSearch.svelte';

	$: search = $page.url.searchParams.get('word');
</script>

{#if search}
	{#await api.product.getBySearch(search)}
		<MoonLoading />
	{:then res}
		{#if res.error}
			<h3 class="mt-8">{$t('auth.code.error')}</h3>
		{:else}
			<ResultPanelSearch word={search} products={res.products} meta={res.meta} />
		{/if}
	{:catch error}
		<h3 class="mt-8">{$t('auth.code.error')}</h3>
	{/await}
{:else}
	<h3 class="mt-8">{$t('product.search.page.error.empty')}</h3>
{/if}

<style>
	@import '../../styles/tailwind.css';
	/* your styles go here */
</style>
