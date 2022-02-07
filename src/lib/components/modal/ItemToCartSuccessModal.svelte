<script>
	import {getContext} from "svelte";
	import { t } from '$lib/i18n'
	import { sidebar } from '$lib/stores';
	import WithActionModal from './WithActionModal.svelte';
	import CartSidebar from "../cart/CartSidebar.svelte";
	import CheckCircleIcon from '../svg/CheckCircleIcon.svelte';

	export let product, selectedColor, selectedSize, quantity;
	const { close } = getContext("simple-modal");

	function showCart() {
		$sidebar = CartSidebar;
		close();
	}
</script>

<WithActionModal cancelText={$t("product.modal.cta.continue-shopping")}>
	<span slot="header">{$t("product.modal.title", {article: product.name})}</span>
	<CheckCircleIcon slot="icon" />
	<svelte:fragment slot="content">
		<p class="text-md text-gray-600">
			{$t("product.modal.description")}
		</p>
		<ul class="text-md mt-3 text-gray-600 list-disc list-inside">
			{$t("product.modal.item-detail.text")}
			{#if selectedSize}
				<li>{$t("variants.size.name")}: {selectedSize.name}</li>
			{/if}
			{#if selectedColor}
				<li>{$t("variants.color.name")}: {selectedColor.name}</li>
			{/if}
			<li>{$t("product.detail.quantity")}: {quantity}</li>
		</ul>
	</svelte:fragment>
	<button
		type="button"
		on:click={showCart}
		slot="action"
		class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
	>
		{$t("product.modal.cta.check-cart")}
	</button>
</WithActionModal>