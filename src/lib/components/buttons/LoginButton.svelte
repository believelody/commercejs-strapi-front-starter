<script>
  import { t } from '$lib/i18n';
  import { media } from "$lib/stores";
  import LoginIcon from '$lib/elements/icon/LoginIcon.svelte';
  import AuthModal from '../modals/AuthModal.svelte';
  import LinkButton from '$lib/elements/button/LinkButton.svelte';
  import { openModal } from '../../elements/modal/Modal.svelte';

  function showLoginModal() {
    openModal({ component: AuthModal });
  }
</script>

<style>
    /* your styles go here */
</style>

<LinkButton on:click={showLoginModal}>
  <span class="hidden lg:inline">{$t("header.connexion")}</span>
  <LoginIcon color={$media.mobile ? "black" : "gray-600"} strokeWidth={$media.mobile ? 2 : 1} />
</LinkButton>