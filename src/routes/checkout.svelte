<script>
	import { getContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { loadStripe } from '@stripe/stripe-js';
	import { isServer } from 'svelte-stripe-js';
	import { t } from '$lib/i18n';
	import { cart, checkout, checkoutLoading, stripe, jwt, profile, shipping, billing } from '$lib/stores';
	import api from '$lib/api';
	import InformationPanel from '../lib/components/checkout/InformationPanel.svelte';
	import OrderPanel from '../lib/components/checkout/OrderPanel.svelte';
	import MoonLoading from '../lib/components/loading/MoonLoading.svelte';
	import InfoModal from '../lib/components/modal/InfoModal.svelte';

	const { open } = getContext("simple-modal");

	onMount(async () => {
		if (!isServer) {
			$stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
			
		}
		if ($cart && $cart.total_unique_items > 0) {
			$checkoutLoading = true;
			if ($jwt) {
				$shipping = $profile.customer.meta.shipping;
				$billing = $profile.customer.meta.billing;
			}
			const res = await api.checkout.getCheckoutByCart($cart.id);
			if (!res.success) {}
			$checkoutLoading = false;
		} else if (window) {
			open(InfoModal, { title: $t("checkout.no-cart.title"), description: $t("checkout.no-cart.description") })
			goto("/");
		}
	});
</script>

{#if $cart && $checkout}
	<div class="flex relative">
		<InformationPanel />
		<OrderPanel />
	</div>
{:else}
	<MoonLoading />
{/if}
