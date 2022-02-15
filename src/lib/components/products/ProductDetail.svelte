<script>
	import { onMount, getContext } from 'svelte';
	import { page } from "$app/stores";
	import api from "$lib/api";
	import { t } from '$lib/i18n';
	import { reviewsProduct } from "$lib/stores";
	import Gallery from '$lib/elements/gallery/Gallery.svelte';
	import Star from '$lib/elements/star/Star.svelte';
	import FacebookIcon from '$lib/elements/icon/FacebookIcon.svelte';
	import InstagramIcon from '$lib/elements/icon/InstagramIcon.svelte';
	import TwitterIcon from '$lib/elements/icon/TwitterIcon.svelte';
	import Colors from '../variants/Colors.svelte';
	import Sizes from '../variants/Sizes.svelte';
	import AddToCartBtn from '../buttons/AddToCartBtn.svelte';
	import Quantity from '../quantity/Quantity.svelte';
	import WishlistButton from '../buttons/WishlistButton.svelte';
	import ProductAttributes from "./ProductAttributes.svelte";
	import RelatedProducts from "./RelatedProducts.svelte";
	import ShippingBadge from '../badges/ShippingBadge.svelte';
	import SecurityBadge from '../badges/SecurityBadge.svelte';
	import PaymentBadge from '../badges/PaymentBadge.svelte';
	import Card from '$lib/elements/card/Card.svelte';

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

<section class="container mx-auto text-gray-800 body-font">
	<div class="py-4 lg:py-16">
		<div class="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4">
			<div>
                <Gallery images={product.assets} />
            </div>
			<Card class="flex flex-col px-2 lg:px-0" shadow="none">
				<svelte:fragment slot="header">
					<section class="flex items-center justify-between">
						<div class="flex py-2">
							<a href="/"><FacebookIcon /></a>
							<a href="/" class="mx-2"><TwitterIcon /></a>
							<a href="/"><InstagramIcon strokeWidth={2} /></a>
						</div>
						<WishlistButton {product} />
					</section>
					<h2 class="text-gray-900 title-font font-medium">{product.name}</h2>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="flex my-2">
						{#if score > 0}
							<a href={`${$page.url.pathname}/reviews`} class="flex items-center hover:underline">
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
									<span class="text-neutral-dark ml-3">{$reviewsProduct.length} {$t("product.detail.reviews")}</span>
								{:else}
									<span class="text-neutral-dark ml-3">{$t("common.update")}</span>
								{/if}
							</span>
						{/if}
						{#if (product.attributes.length)}
							<button on:click={ showAttributesModal } class="ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
								{$t("product.detail.characteristics")}
							</button>
						{/if}
					</div>
					<p class="flex-flex-grow leading-relaxed">{@html product.description}</p>
					<div class="grid grid-cols-1 gap-2 md:gap-4 md:py-2 py-6 border-b border-gray-300">
						{#if colors}
							<Colors {colors} bind:selectedColor />
						{/if}
						{#if sizes}
							<Sizes {sizes} bind:value={selectedSize} />
						{/if}
						<Quantity bind:value={qty} />
					</div>
				</svelte:fragment>
				<svelte:fragment slot="extra">
					<div class="flex items-center justify-between py-2">
						<span class="title-font font-medium text-2xl text-gray-900">{product.price.formatted_with_symbol}</span>
						<AddToCartBtn {product} quantity={qty} {selectedColor} {selectedSize} />
					</div>
				</svelte:fragment>
			</Card>
		</div>
	</div>
	<div>
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
