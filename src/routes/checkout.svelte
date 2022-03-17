<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { loadStripe } from '@stripe/stripe-js';
	import { isServer } from 'svelte-stripe-js';
	import { t } from '$lib/i18n';
	import {
		cart,
		checkout,
		checkoutLoading,
		stripe,
		jwt,
		profile,
		shipping,
		billing
	} from '$lib/stores';
	import api from '$api';
	import InformationPanel from '$components/checkout/InformationPanel.svelte';
	import OrderPanel from '$components/checkout/OrderPanel.svelte';
	import MoonLoading from '$components/loading/MoonLoading.svelte';
	import InfoModal from '$elements/modal/InfoModal.svelte';
	import { openModal } from '$elements/modal/Modal.svelte';
	import { varEnv } from '$utils/env.util';

	onMount(async () => {
		console.log(isServer);
		console.log(varEnv["stripePublicKey"]);
		if (!isServer) {
			$stripe = await loadStripe(varEnv["stripePublicKey"]);
		}
		if ($cart && $cart.total_unique_items > 0) {
			$checkoutLoading = true;
			if ($jwt && $profile?.customer?.meta) {
				$shipping = $profile.customer.meta.shipping;
				$billing = $profile.customer.meta.billing;
			}
			const res = await api.checkout.getCheckoutByCart($cart.id);
			if (!res.success) {
			}
			$checkoutLoading = false;
		} else if (window) {
			openModal({
				component: InfoModal,
				props: {
					title: $t('checkout.no-cart.title'),
					description: $t('checkout.no-cart.description')
				}
			});
			goto('/');
		}
	});
</script>

{#if $cart && $checkout}
	<div class="w-full grid grid-cols-1 lg:grid-cols-3 relative">
		<InformationPanel />
		<OrderPanel />
	</div>
{:else}
	<MoonLoading />
{/if}
