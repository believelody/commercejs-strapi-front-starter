<script>
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import api from '$lib/api';
	import { t } from '$lib/i18n';
	import { reviewsProduct } from '$lib/stores';
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
	import RelatedProducts from './RelatedProducts.svelte';
	import ShippingBadge from '../badges/ShippingBadge.svelte';
	import SecurityBadge from '../badges/SecurityBadge.svelte';
	import PaymentBadge from '../badges/PaymentBadge.svelte';
	import Card from '$lib/elements/card/Card.svelte';
	import { openModal } from '../../elements/modal/Modal.svelte';
	import AttributesProductsModal from '../modals/AttributesProductsModal.svelte';
	import Button from '../../elements/button/Button.svelte';

	export let product;
	const variants = writable([]);
	let selectedOption = {},
		quantity = 1,
		loading = false;
	setContext('variants', variants);

	async function getProductReviews(productId) {
		loading = true;
		const res = await api.review.getFromProductId(productId);
		$reviewsProduct = res.success ? res.reviews : [];
		loading = false;
	}

	function showAttributesModal() {
		openModal({
			component: AttributesProductsModal,
			props: { attributes: product.attributes }
		});
	}

	function selectVariantGroupComponent(value) {
		switch (value.toLowerCase()) {
			case $t('variants.color.key'):
			case $t('variants.color.name'):
				return Colors;
			case $t('variants.size.key'):
			case $t('variants.size.name'):
				return Sizes;
			default:
				return null;
		}
	}

	onMount(async () => {
		await getProductReviews(product.id);
	});

	$: api.product.getVariants(product.id).then((res) => {
		$variants = res.variants;
	});
	$: score = $reviewsProduct.length
		? $reviewsProduct.reduce((acc, cur) => acc + cur.ratings, 0) / $reviewsProduct.length
		: 0;
	$: selectedVariant = $variants.find((variant) => {
		return Object.entries(variant.options).every(
			([variantGroupId, variantOptionId]) => variantOptionId === selectedOption[variantGroupId]?.id
		);
	});
	$: isUnavailable = () => {
		return Object.keys(selectedOption).length &&
			selectedOption.constructor === Object &&
			selectedVariant
			? product.quantity === 0 ||
					product.is.sold_out ||
					selectedVariant?.inventory === 0 ||
					quantity > selectedVariant?.inventory
			: false;
	};

	$: console.log(product);
</script>

<svelte:head>
	<title>{product.seo?.title}</title>
	<meta description={product.seo?.description} />
</svelte:head>

<div class="container mx-auto text-neutral-dark body-font">
	<div class="py-4 lg:py-16">
		<div class="mx-auto lg:grid lg:grid-cols-2 gap-4">
			<div>
				<Gallery images={product.assets} />
			</div>
			<Card class="p-2 md:m-2 lg:m-0 border" shape="rounded-xl" shadow="lg">
				<svelte:fragment slot="header">
					<section class="flex items-center justify-between">
						<div class="flex py-2">
							<a href="/"><FacebookIcon /></a>
							<a href="/" class="mx-2"><TwitterIcon /></a>
							<a href="/"><InstagramIcon strokeWidth={2} /></a>
						</div>
						<WishlistButton {product} />
					</section>
					<h2 class="text-neutral-dark title-font font-medium">{product.name}</h2>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="flex my-2">
						{#if score > 0}
							<a href={`${$page.url.pathname}/reviews`} class="flex items-center hover:underline">
								{#if !loading}
									<Star nb={score} />
									{score}/5
									<span class="ml-4">{$reviewsProduct.length} {$t('product.detail.reviews')}</span>
								{:else}
									<span>{$t('common.update')}</span>
								{/if}
							</a>
						{:else}
							<span class="flex items-center">
								{#if !loading}
									<Star nb={score} />
									{score}/5
									<span class="text-neutral-dark ml-3">
										{$reviewsProduct.length} {$t('product.detail.reviews')}</span
									>
								{:else}
									<span class="text-neutral-dark ml-3">{$t('common.update')}</span>
								{/if}
							</span>
						{/if}
						{#if product.attributes.some((attribute) => attribute.value)}
							<button
								on:click={showAttributesModal}
								class="ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s"
							>
								{$t('product.detail.characteristics')}
							</button>
						{/if}
					</div>
					<p class="flex flex-grow leading-relaxed">{@html product.description}</p>
					<div class="grid grid-cols-1 gap-2 md:gap-4 md:py-2 py-6 border-b border-gray-300">
						{#if $variants.length}
							{#each product.variants as variantGroup}
								<svelte:component
									this={selectVariantGroupComponent(variantGroup.name)}
									{variantGroup}
									on:selectOption={({ detail }) =>
										(selectedOption[variantGroup.id] = detail.selectedOption)}
									selectedOption={selectedOption[variantGroup.id]}
								/>
							{/each}
						{/if}
						<Quantity bind:value={quantity} />
					</div>
				</svelte:fragment>
				<svelte:fragment slot="extra">
					<div class="flex items-center justify-between pt-2">
						<span class="title-font font-medium text-2xl text-gray-900">
							{selectedVariant?.price.formatted_with_symbol ?? product.price.formatted_with_symbol}
						</span>
						{#if isUnavailable()}
							<Button big disabled>{$t('product.cart.sold-out')}</Button>
						{:else}
							<AddToCartBtn {product} {quantity} {selectedOption} {selectedVariant} />
						{/if}
					</div>
				</svelte:fragment>
			</Card>
		</div>
	</div>
	<section class="mt-4 grid grid-cols-1 md:w-3/5 lg:w-auto md:mx-auto lg:grid-cols-3 gap-4">
		<ShippingBadge />
		<SecurityBadge />
		<PaymentBadge />
	</section>
	<RelatedProducts class="py-4" items={product.related_products} />
</div>

<style>
	@import '../../../styles/tailwind.css';

	.sold-out {
		@apply py-4 px-16 text-lg border border-neutral rounded-lg cursor-not-allowed;
	}
</style>
