<script>
	import { onMount, getContext } from 'svelte';
	import { page } from "$app/stores";
	import api from "$lib/api";
	import { t } from '$lib/i18n';
	import { reviewsProduct } from "$lib/stores";
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
	import ProductAttributes from "./ProductAttributes.svelte";
	import RelatedProducts from "./RelatedProducts.svelte";
	import ShippingBadge from '../badges/ShippingBadge.svelte';
	import SecurityBadge from '../badges/SecurityBadge.svelte';
	import PaymentBadge from '../badges/PaymentBadge.svelte';

	export let product;
	const sizes = product?.variants[0];
	const colors = product?.variants[1];
	let selectedColor = colors?.options[0], selectedSize, qty = 1, loading = false;

	const { open } = getContext("simple-modal");

	async function getProductReviews(productId) {
		loading = true;
		const res = await api.review.getFromProductId(productId);
		$reviewsProduct = res.success ? res.reviews : [];
		loading = false;
	}

	function showAttributesModal() {
		open(ProductAttributes, { attributes: product.attributes });
	}

	onMount(async () => {
		await getProductReviews(product.id);
	});

	$: score = $reviewsProduct.length ? ($reviewsProduct.reduce((acc, cur) => acc + cur.ratings, 0) / $reviewsProduct.length) : 0;
</script>

<section class="text-gray-800 body-font">
	<div class="px-5 py-4 lg:py-24 mx-auto">
		<div class="lg:w-4/5 mx-auto flex flex-wrap items-stretch">
			<div class="lg:w-1/2 w-full h-auto">
                <Gallery images={product.assets} />
            </div>
			<div class="lg:w-1/2 w-full h-auto lg:pl-4 xl:pl-10 xl:py-6 mt-6 lg:mt-0">
				<section class="flex items-center justify-between">
					<div class="flex py-2">
						<a href="/"><FacebookIcon /></a>
						<a href="/" class="mx-2"><TwitterIcon /></a>
						<a href="/"><InstagramIcon /></a>
					</div>
					<WishlistButton {product} />
				</section>
				<h1 class="text-gray-900 text-3xl title-font font-medium">{product.name}</h1>
				<div class="flex my-2">
					{#if score > 0}
						<a href={`${$page.path}/reviews`} class="flex items-center hover:underline">
							{#if !loading}
								<Star nb={score} /> {score}/5
								<span class="ml-4">{$reviewsProduct.length} {$t("product.detail.reviews")}</span>
							{:else}
								<span>{$t("common.update")}</span>
							{/if}
						</a>
					{:else}
						<span class="flex items-center">
							{#if !loading}
								<Star nb={score} /> {score}/5
								<span class="text-gray-600 ml-3">{$reviewsProduct.length} {$t("product.detail.reviews")}</span>
							{:else}
								<span class="text-gray-600 ml-3">{$t("common.update")}</span>
							{/if}
						</span>
					{/if}
					{#if (product.attributes.length)}
						<button on:click={ showAttributesModal } class="ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
							{$t("product.detail.characteristics")}
						</button>
					{/if}
				</div>
				<p class="leading-relaxed mb-2 self-stretch">{@html product.description}</p>
				<div class="flex flex-wrap justify-between items-center md:py-2 py-6 border-b border-gray-300">
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
				</div>
			</div>
		</div>
	</div>
	<div class="w-4/5 mx-auto block">
		<section class="mt-4 grid grid-cols-1 md:w-4/5 lg:w-auto md:mx-auto lg:grid-cols-3 gap-y-4 gap-x-4">
			<ShippingBadge />
			<SecurityBadge />
			<PaymentBadge />
		</section>
		<RelatedProducts items={product.related_products} />
	</div>
</section>

<style>
</style>
