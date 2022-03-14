<script>
	export let product;
</script>

<li class="hover:border hover:border-neutral hover:rounded">
	<a href="/products/{product.permalink}" class="block relative h-48 rounded overflow-hidden">
		<img
			alt={product.name}
			src={product.media.source}
		/>
	</a>
	<div class="mt-4">
		<p class="category-name">
			<a href="/categories/{product.categories.find((category) => true).name}">
				{product.categories.find((category) => true).name}
			</a>
		</p>
		<p class="product-name">
			<a href="/products/{product.permalink}">{product.name}</a>
		</p>
		<p class="mt-1">{product.price.formatted_with_symbol}</p>
	</div>
</li>

<style>
	@import '../../../styles/tailwind.css';

    li {
        @apply p-4 w-full;
    }
    img {
        @apply transition-transform duration-500 object-cover w-full h-full block;
    }
    .product-name {
        @apply text-neutral-dark text-lg font-medium underline;
    }
    .category-name {
        @apply text-neutral text-xs tracking-widest mb-1;
    }
</style>
