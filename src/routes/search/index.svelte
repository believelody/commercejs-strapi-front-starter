<script context="module">
	import api from '$lib/api';
	import ResultPanelSearch from '../../lib/components/search/ResultPanelSearch.svelte';

	export async function load({ url }) {
		// const search = url.searchParams.get('word');
		// const res = await api.product.getBySearch(search);
		// if (res.error) {
		// 	return {
		// 		props: { error: res.error }
		// 	};
		// }
		// return {
		// 	props: {
		// 		products: res.products,
		// 		meta: res.meta
		// 	}
		// };
		const res = await api.product.getAll();

        if (res.error) {
            return {
                props: { error: res.error }
            }
        }
		console.log(res);
		return {
			props: { products: res.products, meta: res.meta }
		};
	}
</script>

<script>
	export let products, meta;
	let mockProducts = Array.from({ length: 175 }, (v, i) => i + 1);

	$: console.log(products);
</script>

<ResultPanelSearch {products} {meta} />

<style>
	/* your styles go here */
</style>
