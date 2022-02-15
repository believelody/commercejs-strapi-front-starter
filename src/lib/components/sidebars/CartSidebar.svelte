<script>
	import {getContext, onDestroy} from "svelte";
	import { sidebar, cart } from '$lib/stores';
	import { t } from '$lib/i18n'
	import api from '$lib/api';
	import CartList from '../list/CartList.svelte';
	import SidebarWrapper from "$lib/elements/sidebar/SidebarWrapper.svelte";
	import { openDangerModal } from "../../context/modal";
	import DangerButton from "../../elements/button/DangerButton.svelte";
	import PrimaryButton from "../../elements/button/PrimaryButton.svelte";

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
		<h2 class="ml-2 mt-2 text-lg font-medium text-neutral-dark" id="slide-over-title">
			{$t("cart.title")} : {$cart.total_unique_items} {$t(`cart.items.${$cart.total_unique_items > 1 ? 'plural' : 'singular'}`)}
		</h2>

		<CartList items={$cart.line_items} {loading} on:loading={e => loading = e.detail} />

		<DangerButton
			disabled={loading}
			on:click={showEmptyCartModal}
			outlined
			block
		>
			{$t("cart.cta.empty")}
		</DangerButton>

		<div class="actions py-2 px-4 w-full">
			<div class="flex justify-between text-base font-medium text-gray-900">
				<p>{$t("cart.subtotal")}</p>
				<p>{$cart.subtotal.formatted_with_symbol}</p>
			</div>
			<p class="mt-0.5 text-sm text-gray-500">{$t("cart.shipping-taxes")}</p>
			<div class="mt-6">
				<PrimaryButton block>
					<a id="cart-id-goto-checkout" href="/checkout">
						{#if loading}
							{$t("cart.cta.loading")}
						{:else}
							{$t("cart.cta.checkout")}
						{/if}
					</a>
				</PrimaryButton>
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
