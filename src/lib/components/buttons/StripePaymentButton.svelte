<script>
	import { t } from '$lib/i18n';
	import { checkout, checkoutLoading } from '$lib/stores';
	import PrimaryButton from '$elements/button/PrimaryButton.svelte';
	import StripePaymentModal from '../modals/StripePaymentModal.svelte';
	import { modal } from '$elements/modal/Modal.svelte';

	export let cardElement, isValid;

	function showModal() {
		modal.open(
			{
				component: StripePaymentModal,
				props: {
					cardElement
				}
			},
			{
				noCloseButton: true,
				noCloseOnEsc: true,
				noCloseOnOuterClick: true
			}
		);
	}
</script>

<PrimaryButton on:click={showModal} disabled={!isValid} large block>
	{#if $checkoutLoading}
		{$t('common.update')}
	{:else}
		{$t('checkout.submit-stripe', { amount: $checkout.live.total.formatted_with_symbol })}
	{/if}
</PrimaryButton>

<style>
	/* your styles go here */
</style>
