<script>
	import {getContext, onDestroy} from "svelte";
	import { sidebar, cart } from '$lib/stores';
	import { t } from '$lib/i18n'
	import api from '$lib/api';
	import CartList from '../list/CartList.svelte';
	import SidebarWrapper from "../../elements/sidebar/SidebarWrapper.svelte";
	import { openDangerModal } from "../../context/modal";

	let loading = false;
	const { open } = getContext("simple-modal");

	onDestroy(() => {
		$sidebar = null;
	});

	function showEmptyCartModal() {
		openDangerModal(open, {
			title: $t("cart.modal.empty.title"),
			description: $t("modal.description.default"),
			actionCallback: async () => {
				const res = await api.cart.emptyCart($cart.id);
				if (res.success) {
					$sidebar = null;
				}
				return res;
			},
			notificationHeading: $t('notifications.cart.heading'),
			notificationText: $t('notifications.cart.description.empty'),
		});
	}
</script>

<SidebarWrapper>
	{#if $cart && $cart.total_unique_items > 0}
		<h2 class="ml-2 mt-2 text-lg font-medium text-gray-900" id="slide-over-title">
			{$t("cart.title")} : {$cart.total_unique_items} {$t(`cart.items.${$cart.total_unique_items > 1 ? 'plural' : 'singular'}`)}
		</h2>

		<CartList items={$cart.line_items} {loading} on:loading={e => loading = e.detail} />

		<button
			disabled={loading}
			on:click={showEmptyCartModal}
			class="py-2 w-full border-t-2 border-b-2 border-red-400 bg-red-100 shadow-sm text-base font-medium text-black bg-gray-400 hover:bg-red-300 disabled:opacity-75 disabled:cursor-wait disabled:bg-gray-300"
		>
			{$t("cart.cta.empty")}
		</button>

		<div class="actions py-2 px-4 w-full">
			<div class="flex justify-between text-base font-medium text-gray-900">
				<p>{$t("cart.subtotal")}</p>
				<p>{$cart.subtotal.formatted_with_symbol}</p>
			</div>
			<p class="mt-0.5 text-sm text-gray-500">{$t("cart.shipping-taxes")}</p>
			<div class="mt-6">
				<a
					id="cart-id-goto-checkout"
					href="/checkout"
					class="flex flex-grow justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:cursor-wait"
				>
					{#if loading}
						{$t("cart.cta.loading")}
					{:else}
						{$t("cart.cta.checkout")}
					{/if}
				</a>
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
</SidebarWrapper>
