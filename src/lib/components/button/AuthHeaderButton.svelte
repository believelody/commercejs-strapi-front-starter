<script>
    import { getContext } from 'svelte';
    import { t } from '$lib/i18n';
    import ShortRightArrowIcon from '../svg/ShortRightArrowIcon.svelte';
    import AuthModal from '../modal/AuthModal.svelte';

  const { open } = getContext("simple-modal");

  function showLoginModal() {
    open(AuthModal);
  }
</script>

<style>
    /* your styles go here */
</style>

<button on:click={showLoginModal} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    {$t("header.connexion")}
    <ShortRightArrowIcon color="gray-600" size={4} />
</button>