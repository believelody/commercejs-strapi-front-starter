<script>
    import { getContext, onMount } from 'svelte';
    import { getNotificationsContext } from 'svelte-notifications';
    import { t } from '$lib/i18n';
    import api from "$lib/api";
    import { jwt, profile, user } from '$lib/stores';
    import HeartCircleIcon from "$lib/elements/icon/HeartCircleIcon.svelte";
    import { openAuthModal, openConfirmationEMailModal } from '../../context/modal';
import IconButton from '../../elements/button/IconButton.svelte';
    
    export let product;
    let wishlist, isInWishlist = false;

    const { open } = getContext("simple-modal");
    const { addNotification } = getNotificationsContext();

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
            addNotification({
                position: 'bottom-left',
                heading: $t('notifications.wishlist.heading'),
                text: $t(`notifications.wishlist.description.${isInWishlist ? "add" : "remove"}`, { name: wishlist?.product.name }),
                description: $t(`notifications.wishlist.description.${isInWishlist ? "add" : "remove"}`, { name: wishlist?.product.name }),
                type: 'success',
                removeAfter: 5000
            });
        } else if ($jwt && !$user.confirmed) {
            openConfirmationEMailModal(open);
        } else {
            openAuthModal(open);
        }
    }

    function checkIfIsInWishlist() {
        isInWishlist = wishlist && wishlist.users.some(user => user.id === $profile?.id);
    }
    
    onMount(async () => {
        const res = await api.wishlist.getFromProductId(product.id);
        if (res.success && res.wishlists.length) {
            wishlist = res.wishlists[0];
            checkIfIsInWishlist();
        }
    });
</script>

<style>
    /* your styles go here */
</style>

<div class="flex items-center">
    {#if wishlist?.users.length}
        <span class="mr-2 text-center text-2xl w-full">{wishlist.users.length}</span>
    {/if}
    <IconButton
        on:click={putInWishlist}
        shape="circle"
        class="w-16 h-16 px-3"
        icon={HeartCircleIcon}
        size={10}
        color={isInWishlist ? "red-500" : ""}
    />
</div>
