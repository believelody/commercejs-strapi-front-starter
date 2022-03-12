<script>
	import { t } from '$lib/i18n';
	import LinkButton from '$elements/button/LinkButton.svelte';
	import { openModal } from '$elements/modal/Modal.svelte';
	import OrderContactModal from '../modals/OrderContactModal.svelte';

	export let reference, customer, orderId;
</script>

<LinkButton
	on:click={() =>
		openModal({ component: OrderContactModal, props: { reference, customer, orderId } })}
	class="underline"
>
	{$t('order.detail.contact')}
</LinkButton>

<style>
	/* your styles go here */
</style>
