<script>
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n';
	import { cart, checkout, sidebar } from '$lib/stores';
	import api from '$lib/api';
	import TrashIcon from '$lib/elements/icon/TrashIcon.svelte';
	import SecondaryButton from '../../elements/button/SecondaryButton.svelte';
	import IconButton from '../../elements/button/IconButton.svelte';
	import DangerModal from '../../elements/modal/DangerModal.svelte';
	import { closeModal, openModal } from '../../elements/modal/Modal.svelte';
	import { notifications } from '../../elements/notification/Notification.svelte';

	export let items, loading;
	const dispatch = createEventDispatcher();

	async function updateQuantity(item, quantity) {
		try {
			dispatch('loading', true);
			if ($checkout) {
				await api.checkout.checkQuantity($checkout.id, item.id, quantity, item.variant.id);
			}
			const resUpdateQuantity = await api.cart.updateItemQuantity($cart.id, item.id, quantity);
			if (resUpdateQuantity.success) {
				notifications.success({
					title: $t('notifications.cart.title'),
					message: $t('notifications.cart.message.update', { name: item.name })
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch('loading', false);
		}
	}

	function showRemoveItemModal(item) {
		openModal({
			component: DangerModal,
			props: {
				title: $t('cart.modal.delete-item.title', { name: item.name }),
				description: $t('cart.modal.delete-item.description'),
				actionCallback: async () => {
					const res = await api.cart.deleteItem($cart.id, item.id);
					if (res.success) {
						notifications.success({
							title: $t('notifications.cart.title'),
							message: $t('notifications.cart.message.remove', { name: item.name })
						});
						closeModal();
						if (!$cart.line_items.length) {
							$sidebar = null;
						}
					}
				}
			}
		});
	}
</script>

<div class="border-b border-gray-200 flex-grow mt-1 overflow-y-hidden">
	<div class="h-full px-2 overflow-y-auto">
		<div class="h-full flow-root">
			<ul role="list" class="h-full divide-y divide-gray-200">
				{#each items as item}
					<li class="py-6 flex">
						<a
							href="/products/{item.permalink}"
							class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
						>
							<img
								src={item.image.url}
								alt={item.product_name}
								class="w-full h-full object-center object-cover"
							/>
						</a>

						<div class="ml-4 flex-1 flex flex-col">
							<div>
								<div class="flex justify-between">
									<h3 class="text-base font-medium text-gray-900">
										<a href="/products/{item.permalink}">{item.name}</a>
									</h3>
									<p class="ml-4 text-indigo-500">{item.line_total.formatted_with_symbol}</p>
								</div>
								{#each item.variants as variant}
									<p class="mt-1 text-sm text-gray-500">
										{variant.variant_name} : {variant.option_name}
									</p>
								{/each}
							</div>
							<div class="flex items-center justify-between text-sm">
								<p class="text-neutral-dark flex-center-middle">
									<SecondaryButton
										disabled={item.quantity <= 1 || loading}
										on:click={() => updateQuantity(item, item.quantity - 1)}
										class="xl:text-xl font-medium w-12 h-10"
										>-
									</SecondaryButton>
									<span class="mx-4 xl:text-lg font-medium"
										>{item.quantity}
										x {item.price.formatted_with_symbol}</span
									>
									<SecondaryButton
										disabled={item.quantity >= 5 || loading}
										on:click={() => updateQuantity(item, item.quantity + 1)}
										class="xl:text-xl font-medium w-12 h-10"
										>+
									</SecondaryButton>
								</p>
								<div>
									<IconButton
										on:click={() => showRemoveItemModal(item)}
										class="btn-link"
										icon={TrashIcon}
										size={6}
										color="red-500"
									/>
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	/* your styles go here */
</style>
