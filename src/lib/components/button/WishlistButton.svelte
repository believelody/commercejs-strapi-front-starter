<script>
    import { getContext } from 'svelte';
    import { t } from '$lib/i18n';
    import { jwt } from '$lib/stores';
    import HeartCircleIcon from "../svg/HeartCircleIcon.svelte";
    import AuthModal from '../modal/AuthModal.svelte';
    
    export let product;

    const { open } = getContext("simple-modal");

    function showLoginModal() {
        open(AuthModal, { title: $t("wishlist.modal.auth.title")});
    }

    async function putInWishlist() {
        if (!$jwt) {

        } else {
            showLoginModal()
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<button on:click={putInWishlist} class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
    <HeartCircleIcon />
</button>