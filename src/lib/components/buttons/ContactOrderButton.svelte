<script>
	import { t } from '$lib/i18n';
	import LinkButton from '$elements/button/LinkButton.svelte';
	import OrderContactModal from '../modals/OrderContactModal.svelte';
	import { modal } from '$elements/modal/Modal.svelte';

	export let reference, customer, orderId;
</script>

<LinkButton
	on:click={() =>
		modal.open({ component: OrderContactModal, props: { reference, customer, orderId } })}
	class="underline"
>
	{$t('order.detail.contact')}
</LinkButton>

<style>
	/* your styles go here */
</style>
