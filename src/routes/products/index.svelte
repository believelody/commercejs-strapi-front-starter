<script context="module">
	import { baseUrl } from '$lib/utils/url.util';

	export async function load({ fetch }) {
		try {
			const res = await fetch(`${baseUrl}/products/category/pets`);
			const { products, meta } = await res.json();
			return {
				props: { products, meta }
			};
		} catch (error) {
			console.log(error);
			return { props: { error } };
		}
	}
</script>

<script>
	import ProductList from '$lib/components/products/ProductList.svelte';

	export let products, meta, error;
</script>

<ProductList {products} />
