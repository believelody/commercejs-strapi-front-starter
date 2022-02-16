<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import api from '$lib/api';
	import { t } from '$lib/i18n';
	import { cart, sidebar } from '$lib/stores';
	import CartSidebar from '../sidebars/CartSidebar.svelte';
	import { closeModal, openModal } from '../../elements/modal/Modal.svelte';
	import LoadingModal from '../modals/LoadingModal.svelte';
	import SuccessButton from '../../elements/button/SuccessButton.svelte';
	import { openSidebar } from '../../elements/sidebar/Sidebar.svelte';

	export let order;
	let loading = false,
		error;
	const { addNotification } = getNotificationsContext();

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
			addNotification({
				position: 'bottom-left',
				heading: $t(`notifications.cart.heading`),
				text: $t(
					`notifications.cart.description.add.${order.line_items.length > 1 ? 'many' : 'one'}`
				),
				description: $t(
					`notifications.cart.description.add.${order.line_items.length > 1 ? 'many' : 'one'}`
				),
				type: 'success',
				removeAfter: 5000
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
