<script>
	import api from '$api';
	import { t } from '$lib/i18n';
	import { cart } from '$lib/stores';
	import CartSidebar from '../sidebars/CartSidebar.svelte';
	import { modal } from '$elements/modal/Modal.svelte';
	import LoadingModal from '../modals/LoadingModal.svelte';
	import SuccessButton from '$elements/button/SuccessButton.svelte';
	import { openSidebar } from '$elements/sidebar/Sidebar.svelte';
	import { notifications } from '$elements/notification/Notification.svelte';
	import RenewIcon from '$elements/icon/RenewIcon.svelte';
	import CartIcon from '$elements/icon/CartIcon.svelte';

	export let order, onlyIcon = false;
	let loading = false,
		error;

	async function reOrder() {
		loading = true;
		if (!$cart) {
			await api.cart.createCart();
		}
		const res = await api.cart.addItems(
			$cart.id,
			order.line_items.map((item) => {
				let options = {};
				if (item.variants.length) {
					item.variants.forEach((variant) => {
						options[variant.variant_id] = variant.option_id;
					});
				}
				return { id: item.product_id, quantity: item.quantity, options };
			})
		);
		if (res.success) {
			notifications.success({
				title: $t(`notifications.cart.title`),
				message: $t(
					`notifications.cart.message.add.${order.line_items.length > 1 ? 'many' : 'one'}`
				)
			});
			openSidebar({ component: CartSidebar });
			loading = false;
		} else {
			error = res.error;
		}
	}

	$: loading
		? modal.open({
				component: LoadingModal,
				props: {
					topText: $t('notifications.cart.loading.top'),
					bottomText: $t('notifications.cart.loading.bottom')
				}
		  })
		: modal.closeAll();
</script>

<SuccessButton on:click={reOrder}>
	{#if onlyIcon}
		<div class="flex items-center justify-around">
			<RenewIcon color="white" />
			<CartIcon color="white" />
		</div>
	{:else}
		{$t('order.account.table.body.button.re-order')}
	{/if}
</SuccessButton>

<style>
	/* your styles go here */
</style>
