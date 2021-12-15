<script>
    import { getContext, onMount } from 'svelte';
    import { t } from '$lib/i18n';
    import api from "$lib/api";
    import { jwt, profile } from '$lib/stores';
    import HeartCircleIcon from "../svg/HeartCircleIcon.svelte";
    import AuthModal from '../modal/AuthModal.svelte';
    
    export let product;
    let wishlist;

    const { open } = getContext("simple-modal");

    function showLoginModal() {
        open(AuthModal, { title: $t("wishlist.modal.auth.title")});
    }

    async function putInWishlist() {
        if ($jwt) {
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
        } else {
            showLoginModal();
        }
    }
    
    onMount(async () => {
        const res = await api.wishlist.getFromProductId(product.id);
        if (res.success && res.wishlists.length) {
            wishlist = res.wishlists[0];
        }
    });

    $: isInWishlist = wishlist?.users.some(user => user.id === $profile?.id);
</script>

<style>
    /* your styles go here */
</style>

<div class="flex items-center">
    {#if wishlist?.users.length}
        <span class="mr-2 text-center text-md font-medium w-full">{wishlist.users.length}</span>
    {/if}
    <button on:click={putInWishlist} class="rounded-full w-10 h-10 p-2 bg-gray-200 flex items-center justify-center">
        <HeartCircleIcon color={isInWishlist ? "red-500" : ""} />
    </button>
</div>
