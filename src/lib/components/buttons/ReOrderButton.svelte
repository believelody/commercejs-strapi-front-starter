<script>
	import api from '$lib/api';
	import { t } from '$lib/i18n';
	import { cart } from '$lib/stores';
	import CartSidebar from '../sidebars/CartSidebar.svelte';
	import { closeModal, openModal } from '../../elements/modal/Modal.svelte';
	import LoadingModal from '../modals/LoadingModal.svelte';
	import SuccessButton from '../../elements/button/SuccessButton.svelte';
	import { openSidebar } from '../../elements/sidebar/Sidebar.svelte';
	import { notifications } from '../../elements/notification/Notification.svelte';

	export let order;
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
			notifications.danger({
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
		? openModal({
				component: LoadingModal,
				props: {
					topText: $t('notifications.cart.loading.top'),
					bottomText: $t('notifications.cart.loading.bottom')
				}
		  })
		: closeModal();
</script>

<SuccessButton on:click={reOrder}>
	{$t('order.account.table.body.button.re-order')}
</SuccessButton>

<style>
	/* your styles go here */
</style>
