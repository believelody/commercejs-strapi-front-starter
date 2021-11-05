<script>
	import { bind } from 'svelte-simple-modal';
	import { sidebar, cart, modal } from '$lib/stores';
	import { t } from '$lib/i18n'
	import { emptyCart, deleteItem, updateItemQuantity } from '$lib/actions/cart';
	import CloseIcon from '../svg/CloseIcon.svelte';
	import DangerModal from '../modal/DangerModal.svelte';

	let loading = false;

	async function updateQuantity(itemId, quantity) {
		try {
			loading = true;
			await updateItemQuantity($cart.id, itemId, quantity);
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	}

	function showRemoveItemModal(item) {
		modal.set(
			bind(DangerModal, {
				title: $t("cart.modal.delete-item.title", { name: item.name }),
				description: $t('cart.modal.delete-item.description'),
				actionCallback: async () => {
					await deleteItem($cart.id, item.id);
				}
			})
		);
	}

	async function goToCheckout() {
		try {
			$sidebar = null;
			await goto('/checkout');
		} catch (error) {
			console.log(error);
		}
	}

	function showEmptyCartModal() {
		modal.set(
			bind(DangerModal, {
				title: $t("cart.modal.empty.title"),
				description: $t("modal.description.default"),
				actionCallback: async () => {
					await emptyCart($cart.id);
					$sidebar = null
				}
			})
		);
	}
</script>

<div class="sm:w-screen max-w-md h-screen bg-white flex flex-col relative">
	<button
		on:click={() => ($sidebar = null)}
		type="button"
		class="rm-2 mt-2 text-gray-400 right-0 hover:text-gray-500 absolute"
	>
		<span class="sr-only">{$t("modal.close")}</span>
		<!-- Heroicon name: outline/x -->
		<CloseIcon />
	</button>
	{#if $cart && $cart.total_unique_items > 0}
		<h2 class="ml-2 mt-2 text-lg font-medium text-gray-900" id="slide-over-title">
			{$t("cart.title")} : {$cart.total_unique_items} {$t(`cart.items.${$cart.total_unique_items > 1 ? 'plural' : 'singular'}`)}
		</h2>
		<div class="border-b border-gray-200 flex-grow flex flex-col pt-4 overflow-y-hidden">
			<div class="h-full mt-2 px-2 list">
				<div class="h-full flow-root">
					<ul role="list" class="h-full divide-y divide-gray-200">
						{#each $cart.line_items as item}
							<li class="py-6 flex">
								<a
									href="/products/{item.permalink}"
									class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
								>
									<img
										src={item.image.url}
										alt={item.product_name}
										class="w-full h-full object-center object-cover"
									/>
								</a>

								<div class="ml-4 flex-1 flex flex-col">
									<div>
										<div class="flex justify-between text-base font-medium text-gray-900">
											<h3>
												<a href="/products/{item.permalink}">{item.name}</a>
											</h3>
											<p class="ml-4">{item.line_total.formatted_with_symbol}</p>
										</div>
										{#each item.variants as variant}
											<p class="mt-1 text-sm text-gray-500">
												{variant.variant_name} : {variant.option_name}
											</p>
										{/each}
									</div>
									<div class="flex-1 flex items-end justify-between text-sm">
										<p class="text-gray-500">
											<button
												disabled={item.quantity <= 1 || loading}
												on:click={() => updateQuantity(item.id, item.quantity - 1)}
												class="text-lg py-1 px-4 text-white rounded bg-gray-600 disabled:opacity-75"
												>-</button
											>
											<span class="mx-4 text-lg">{item.quantity}</span>
											<button
												disabled={item.quantity >= 5 || loading}
												on:click={() => updateQuantity(item.id, item.quantity + 1)}
												class="text-lg py-1 px-4 text-white rounded bg-gray-600 disabled:opacity-75"
												>+</button
											>
										</p>
										<div class="flex">
											<button
												on:click={() => showRemoveItemModal(item)}
												type="button"
												class="font-medium text-indigo-600 hover:text-indigo-500">{$t("cart.cta.remove-item")}</button
											>
										</div>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<button
				disabled={loading}
				on:click={showEmptyCartModal}
				class="py-2 w-full border border-transparent shadow-sm text-base font-medium text-white bg-gray-400 hover:bg-gray-500 disabled:opacity-75"
			>
				{$t("cart.cta.empty")}
			</button>
		</div>

		<div class="actions py-2 px-4 w-full">
			<div class="flex justify-between text-base font-medium text-gray-900">
				<p>{$t("cart.subtotal")}</p>
				<p>{$cart.subtotal.formatted_with_symbol}</p>
			</div>
			<p class="mt-0.5 text-sm text-gray-500">{$t("cart.shipping-taxes")}</p>
			<div class="mt-6">
				<button
					disabled={loading}
					on:click={goToCheckout}
					class="text-center w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75"
				>
					{#if loading}
						{$t("cart.cta.loading")}
					{:else}
						{$t("cart.cta.checkout")}
					{/if}
				</button>
			</div>
			<div class="mt-6 flex justify-center text-sm text-center text-gray-500">
				<p>
					{$t("cart.or")}
					<button
						on:click={() => ($sidebar = null)}
						type="button"
						class="text-indigo-600 font-medium hover:text-indigo-500 ml-2"
					>
						{$t("cart.cta.continue-shopping")}
						<span aria-hidden="true" class="text-md"> &rarr;</span>
					</button>
				</p>
			</div>
		</div>
	{:else}
		<section class="h-full flex items-center justify-center text-xl bg-gray-200 font:medium">
			{$t("cart.empty")}
		</section>
	{/if}
</div>

<style>
	.list {
		overflow-y: auto;
	}
</style>
