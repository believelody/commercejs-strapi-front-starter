<script>
	import { t } from '$lib/i18n';
	import { checkout, checkoutLoading } from '$lib/stores';
import PrimaryButton from '../../elements/button/PrimaryButton.svelte';
	import { openModal } from '../../elements/modal/Modal.svelte';
	import StripePaymentModal from '../modals/StripePaymentModal.svelte';

	export let cardElement, isValid;

	function showModal() {
		openModal({
			component: StripePaymentModal,
			props: {
				cardElement
			},
			options: {
				closeButton: false,
				closeOnEsc: false,
				closeOnOuterClick: false
			}
		});
	}
</script>

<PrimaryButton
	on:click={showModal}
	disabled={!isValid}
    block
>
	{#if $checkoutLoading}
		{$t('common.update')}
	{:else}
		{$t('checkout.submit-stripe', { amount: $checkout.live.total.formatted_with_symbol })}
	{/if}
</PrimaryButton>

<style>
	/* your styles go here */
</style>
