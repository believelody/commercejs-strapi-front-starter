<script>
	import { cart } from '$lib/stores';
	import api from '$api';
	import { t } from '$lib/i18n';
	import PrimaryButton from '$elements/button/PrimaryButton.svelte';
	import ItemToCartSuccessModal from '../modals/ItemToCartSuccessModal.svelte';
	import { modal } from '$lib/elements/modal/Modal.svelte';

	export let product, quantity, selectedVariant, selectedOption;
	let loading = false,
		hasError = false;

	async function addItem() {
		let createCartRes;
		loading = hasError = true;
		if (!$cart) {
			createCartRes = await api.cart.createCart();
		}
		if (!createCartRes || createCartRes.success) {
			const addToCartRes = await api.cart.addToCart(
				$cart.id,
				product.id,
				quantity,
				selectedVariant
			);
			if (addToCartRes.success) {
				modal.open({
					component: ItemToCartSuccessModal,
					props: { product, selectedOption, quantity }
				});
			} else {
				hasError = true;
			}
		} else if (createCartRes.error) {
			hasError = true;
		}
		loading = false;
	}
	$: isValid =
		!loading && selectedVariant
			? Object.keys(selectedVariant.options).length === product.variants.length
			: !!product.variant;
</script>

<PrimaryButton on:click={addItem} disabled={!isValid} big>
	{#if loading}
		{$t('product.cart.adding')}
	{:else}
		{$t('product.cart.add')}
	{/if}
</PrimaryButton>
