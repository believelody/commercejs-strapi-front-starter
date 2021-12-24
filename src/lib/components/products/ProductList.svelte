<script>
	export let products, meta;
</script>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto">
		<ul class="flex flex-wrap m-4">
			{#each products as product}
				<li class="lg:w-1/4 md:w-1/2 p-4 w-full">
					<a href="/products/{product.permalink}" class="block relative h-48 rounded overflow-hidden">
						<img
							alt="{product.name}"
							class="transition duration-500 object-cover hover:object-cover object-center w-full h-full block"
							src="{product.media.source}"
						/>
					</a>
					<div class="mt-4">
						<h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                            <a href="/categories/{product.categories.find((category) => true).name}">
                                {product.categories.find((category) => true).name}
                            </a>
                        </h3>
						<h2 class="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
						<p class="mt-1">{product.price.formatted_with_symbol}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>
