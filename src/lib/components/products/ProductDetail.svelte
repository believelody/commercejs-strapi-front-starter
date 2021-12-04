<script>
	import { t } from '$lib/i18n'
	import Gallery from '../gallery/Gallery.svelte';
	import Star from '../star/Star.svelte';
	import FacebookIcon from '../svg/FacebookIcon.svelte';
	import InstagramIcon from '../svg/InstagramIcon.svelte';
	import TwitterIcon from '../svg/TwitterIcon.svelte';
	import Colors from '../variants/Colors.svelte';
	import Sizes from '../variants/Sizes.svelte';
	import AddToCartBtn from '../cart/AddToCartBtn.svelte';
	import Quantity from '../quantity/Quantity.svelte';
	import WishlistButton from '../button/WishlistButton.svelte';

	export let product;
	const sizes = product?.variants[0];
	const colors = product?.variants[1];
	let selectedColor = colors?.options[0], selectedSize, qty = 1;
</script>

<section class="text-gray-600 body-font">
	<div class="px-5 py-24 mx-auto">
		<div class="lg:w-4/5 mx-auto flex flex-wrap">
			<div class="p-0 m-0 lg:w-1/2 w-full h-auto">
                <Gallery images={product.assets} />
            </div>
			<div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
				<section>
					<span class="flex py-2">
						<FacebookIcon />
						<TwitterIcon />
						<InstagramIcon />
					</span>
				</section>
				<h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
				<div class="flex mb-4">
					<div class="flex items-center">
						<Star nb={3.5} />
						<span class="text-gray-600 ml-3">4 {$t("product.detail.reviews")}</span>
					</div>
					<span class="ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
						{$t("product.detail.characteristics")}
					</span>
				</div>
				<p class="leading-relaxed mb-2">{@html product.description}</p>
				<div class="flex flex-wrap justify-between items-center md:py-2 py-6 border-b border-gray-200">
					{#if colors}
						<Colors {colors} bind:selectedColor />
					{/if}
					{#if sizes}
						<Sizes {sizes} bind:value={selectedSize} />
					{/if}
					<Quantity bind:value={qty} />
				</div>
				<div class="flex items-center mt-4">
					<span class="title-font font-medium text-2xl text-gray-900">{product.price.formatted_with_symbol}</span>
					<AddToCartBtn {product} quantity={qty} {selectedColor} {selectedSize} />
					<WishlistButton {product} />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
</style>
