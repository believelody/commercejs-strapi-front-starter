<script>
	import { sidebar, cart } from '$lib/stores';
	import { t } from '$lib/i18n';
	import api from '$lib/api';
	import CartList from '../list/CartList.svelte';
	import SidebarWrapper from '$lib/elements/sidebar/SidebarWrapper.svelte';
	import DangerButton from '../../elements/button/DangerButton.svelte';
	import PrimaryButton from '../../elements/button/PrimaryButton.svelte';
	import CenterSection from '../../elements/center-section/CenterSection.svelte';
	import LinkButton from '../../elements/button/LinkButton.svelte';
	import { closeModal, openModal } from '../../elements/modal/Modal.svelte';
	import DangerModal from '../../elements/modal/DangerModal.svelte';
	import { closeSidebar } from '../../elements/sidebar/Sidebar.svelte';
	import { notifications } from '../../elements/notification/Notification.svelte';

	let loading = false;

	function showEmptyCartModal() {
		openModal({
			component: DangerModal,
			props: {
				title: $t('cart.modal.empty.title'),
				description: $t('modal.description.default'),
				actionCallback: async () => {
					const res = await api.cart.emptyCart($cart.id);
					if (res.success) {
						closeSidebar();
						notifications.success({
							title: $t('notifications.cart.title'),
							message: $t('notifications.cart.message.empty')
						});
						closeModal();
					}
				}
			}
		});
	}
</script>

{#if $cart && $cart.total_unique_items > 0}
	<SidebarWrapper>
		<h3 slot="header" class="px-2 py-4 border-b font-medium text-neutral-dark">
			{$t('cart.title')} : {$cart.total_unique_items}
			{$t(`cart.items.${$cart.total_unique_items > 1 ? 'plural' : 'singular'}`)}
		</h3>
		<CartList
			slot="content"
			items={$cart.line_items}
			{loading}
			on:loading={(e) => (loading = e.detail)}
		/>
		<svelte:fragment slot="extra">
			<DangerButton disabled={loading} on:click={showEmptyCartModal} outlined block>
				{$t('cart.cta.empty')}
			</DangerButton>
			<div class="py-2 px-4 w-full">
				<div class="flex justify-between text-base font-medium text-gray-900">
					<p>{$t('cart.subtotal')}</p>
					<p>{$cart.subtotal.formatted_with_symbol}</p>
				</div>
				<p class="my-1 text-sm text-gray-500">{$t('cart.shipping-taxes')}</p>
				<div class="py-2 grid grid-cols-1 gap-y-2">
					<PrimaryButton disabled={loading} block>
						<a id="cart-id-goto-checkout" href="/checkout">
							{#if loading}
								{$t('cart.cta.loading')}
							{:else}
								{$t('cart.cta.checkout')}
							{/if}
						</a>
					</PrimaryButton>
					<p class="text-center">{$t('cart.or')}</p>
					<LinkButton on:click={() => ($sidebar = null)} class="text-primary font-medium">
						{$t('cart.cta.continue-shopping')}
					</LinkButton>
				</div>
			</div>
		</svelte:fragment>
	</SidebarWrapper>
{:else}
	<SidebarWrapper>
		<CenterSection slot="content" class="h-full text-xl font-medium">
			{$t('cart.empty')}
		</CenterSection>
	</SidebarWrapper>
{/if}
