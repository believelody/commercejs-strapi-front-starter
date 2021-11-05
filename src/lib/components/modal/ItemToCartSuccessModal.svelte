<script>
	import { modal, sidebar } from '$lib/stores';
	import { t } from '$lib/i18n'
	import CartSidebar from "../cart/CartSidebar.svelte";
	import CheckCircleIcon from '../svg/CheckCircleIcon.svelte';

	export let product, selectedColor, selectedSize, quantity;

	function showCart() {
		$sidebar = CartSidebar;
		$modal = null;
	}
</script>

<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
	<div class="sm:flex sm:items-start">
		<div
			class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
		>
			<!-- Heroicon name: outline/exclamation -->
			<CheckCircleIcon />
		</div>
		<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
			<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
				{$t("product.modal.title", {article: product.name})}
			</h3>
			<div class="mt-2">
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
			</div>
		</div>
	</div>
</div>
<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
	<button
		type="button"
		on:click={showCart}
		class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
	>
		{$t("product.modal.cta.check-cart")}
	</button>
	<button
		type="button"
		on:click={() => $modal = null}
		class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
	>
		{$t("product.modal.cta.continue-shopping")}
	</button>
</div>
