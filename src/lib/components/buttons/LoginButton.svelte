<script>
	import { t } from '$lib/i18n';
	import { media } from '$lib/stores';
	import LoginIcon from '$elements/icon/LoginIcon.svelte';
	import AuthModal from '../modals/AuthModal.svelte';
	import LinkButton from '$elements/button/LinkButton.svelte';
	import { modal } from '$elements/modal/Modal.svelte';

	function showLoginModal() {
		modal.open(AuthModal);
	}
</script>

<LinkButton on:click={showLoginModal}>
	<span class="hidden lg:inline">{$t('header.connexion')}</span>
	<LoginIcon color={$media.mobile ? 'black' : 'neutral-600'} strokeWidth={$media.mobile ? 2 : 1} />
</LinkButton>

<style>
	/* your styles go here */
</style>
