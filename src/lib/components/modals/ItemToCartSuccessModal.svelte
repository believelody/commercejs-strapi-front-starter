<script>
	import {getContext} from "svelte";
	import { t } from '$lib/i18n'
	import WithActionModal from '../../elements/modal/WithActionModal.svelte';
	import CartSidebar from "../sidebars/CartSidebar.svelte";
	import CheckCircleIcon from '../../elements/icon/CheckCircleIcon.svelte';
	import SuccessButton from "../../elements/button/SuccessButton.svelte";
	import { openSidebar } from "../../elements/sidebar/Sidebar.svelte";

	export let product, selectedColor, selectedSize, quantity;
	const { close } = getContext("simple-modal");

	function showCart() {
		openSidebar({ component: CartSidebar });
		close();
	}
</script>

<WithActionModal cancelText={$t("product.modal.cta.continue-shopping")} status="success" iconBgShade="light">
	<CheckCircleIcon color="success" slot="icon" />
	<span slot="header">{$t("product.modal.title", {article: product.name})}</span>
	<svelte:fragment slot="content">
		<p class="text-lg text-neutral-dark">
			{$t("product.modal.description")}
		</p>
		<ul class="text-md mt-3 text-neutral-dark list-disc list-inside">
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
	<SuccessButton
		on:click={showCart}
		slot="action"
		class="w-full"
	>
		{$t("product.modal.cta.check-cart")}
	</SuccessButton>
</WithActionModal>