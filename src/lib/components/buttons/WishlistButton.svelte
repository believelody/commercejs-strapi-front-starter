<script>
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';
	import api from '$lib/api';
	import { jwt, profile, user } from '$lib/stores';
	import HeartCircleIcon from '$lib/elements/icon/HeartCircleIcon.svelte';
	import IconButton from '../../elements/button/IconButton.svelte';
	import { openModal } from '../../elements/modal/Modal.svelte';
	import AuthModal from '../modals/AuthModal.svelte';
	import ConfirmationEmailModal from '../modals/ConfirmationEmailModal.svelte';
	import { notifications } from '../../elements/notification/Notification.svelte';

	export let product;
	let wishlist,
		isInWishlist = false;

	async function putInWishlist() {
		if ($jwt && $user.confirmed) {
			if (!wishlist) {
				const res = await api.wishlist.create(product);
				if (res.success) {
					wishlist = res.wishlist;
				}
			} else {
				const res = await api.wishlist.update(wishlist);
				if (res.success) {
					wishlist = res.wishlist;
				}
			}
			checkIfIsInWishlist();
			notifications.success({
				title: $t('notifications.wishlist.title'),
				message: $t(`notifications.wishlist.message.${isInWishlist ? 'add' : 'remove'}`, {
					name: wishlist?.product.name
				})
			});
		} else if ($jwt && !$user.confirmed) {
			openModal({ component: ConfirmationEmailModal });
		} else {
			openModal({ component: AuthModal });
		}
	}

	function checkIfIsInWishlist() {
		isInWishlist = wishlist && wishlist.users.some((user) => user.id === $profile?.id);
	}

	onMount(async () => {
		const res = await api.wishlist.getFromProductId(product.id);
		if (res.success && res.wishlists.length) {
			wishlist = res.wishlists[0];
			checkIfIsInWishlist();
		}
	});
</script>

<div class="flex items-center">
	{#if wishlist?.users.length}
		<span class="mr-2 text-center text-2xl w-full">{wishlist.users.length}</span>
	{/if}
	<IconButton
		on:click={putInWishlist}
		shape="circle"
		class="w-16 h-16 px-3 {isInWishlist ? 'bg-white shadow-lg border' : ''}"
		icon={HeartCircleIcon}
		size={10}
		color={isInWishlist ? 'danger' : ''}
	/>
</div>

<style>
	.in-wish-list {
		@apply bg-white shadow-lg border;
	}
</style>
