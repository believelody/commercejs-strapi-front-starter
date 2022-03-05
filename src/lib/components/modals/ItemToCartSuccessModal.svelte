<script>
	import { t } from '$lib/i18n'
	import WithActionModal from '../../elements/modal/WithActionModal.svelte';
	import CartSidebar from "../sidebars/CartSidebar.svelte";
	import CheckCircleIcon from '../../elements/icon/CheckCircleIcon.svelte';
	import SuccessButton from "../../elements/button/SuccessButton.svelte";
	import { openSidebar } from "../../elements/sidebar/Sidebar.svelte";
	import { closeModal } from '../../elements/modal/Modal.svelte';

	export let product, selectedOption, quantity;

	function showCart() {
		openSidebar({ component: CartSidebar });
		closeModal();
	}
</script>

<WithActionModal cancelText={$t("product.modal.cta.continue-shopping")} status="success" iconBgShade="light">
	<CheckCircleIcon color="success" slot="icon" iconBgShade="light" />
	<span slot="header">{$t("product.modal.title", {article: product.name})}</span>
	<svelte:fragment slot="content">
		<p class="text-lg text-neutral-dark">
			{$t("product.modal.description")}
		</p>
		<ul class="text-md mt-3 text-neutral-dark list-disc list-inside">
			{$t("product.modal.item-detail.text")}
			{#each Object.values(selectedOption) as item}
				<li>
					{$t(`variants.${item.type}.name`)}:
					<span class="capitalize">{item.type === "size" ? item.name : $t(`common.color.${item.name}`)}</span>
				</li>
			{/each}
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