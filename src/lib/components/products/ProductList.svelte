<script>
	import ItemProduct from './ItemProduct.svelte';

	export let products, meta;
</script>

<section class="text-neutral-dark body-font">
	<div class="container md:px-5 md:py-24 mx-auto">
		<ul class="flex flex-wrap m-4">
			{#each products as product}
				<ItemProduct {product} />
			{/each}
		</ul>
	</div>
</section>
