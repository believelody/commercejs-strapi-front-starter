<script>
	import ItemProduct from './ItemProduct.svelte';

	export let products, meta;
</script>

<section class="text-neutral-dark body-font">
	<div class="container md:px-5 md:py-24 mx-auto">
		<ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each products as product}
				<ItemProduct {product} />
			{/each}
		</ul>
	</div>
</section>
