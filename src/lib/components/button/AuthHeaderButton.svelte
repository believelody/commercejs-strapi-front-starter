<script>
    import { getContext } from 'svelte';
    import { t } from '$lib/i18n';
    import { media } from "$lib/stores";
    import LoginIcon from '../svg/LoginIcon.svelte';
    import AuthModal from '../modal/AuthModal.svelte';

  const { open } = getContext("simple-modal");

  function showLoginModal() {
    open(AuthModal);
  }
</script>

<style>
    /* your styles go here */
</style>

<button on:click={showLoginModal} class="inline-flex items-center justify-center md:border-0 md:py-1 md:px-3 md:focus:outline-none md:hover:bg-gray-200 md:rounded text-base">
    <span class="hidden lg:inline">{$t("header.connexion")}</span>
    <LoginIcon color={$media.mobile ? "black" : "gray-600"} strokeWidth={$media.mobile ? 2 : 1} />
</button>