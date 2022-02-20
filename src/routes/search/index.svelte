<script context="module">
	import api from '$lib/api';
	import ResultPanelSearch from '../../lib/components/search/ResultPanelSearch.svelte';

	export async function load({ url }) {
		const search = url.searchParams.get('word');
		const res = await api.product.getBySearch(search);
		if (res.error) {
			return {
				props: { error: res.error }
			};
		}
		return {
			props: {
				products: res.products,
				meta: res.meta
			}
		};
	}
</script>

<script>
	export let products, meta;

	$: console.log(Array.from({ length: 175 }, (v, i) => i + 1));
</script>

<ResultPanelSearch products={Array.from({ length: 175 }, (v, i) => i + 1)} {meta} />

<style>
	/* your styles go here */
</style>
