<script context="module">
	export async function load({ url, session }) {
		if (isRoutePrivate(url.pathname) && !session.authenticated) {
			// const translate = get(t);
			// modal.open({ component: AuthModal, props: { title: translate('auth.not-authenticated') } });
			return {
				status: 302,
				redirect: '/authentication'
			};
		}
		return {
			props: {}
		};
	}
</script>

<script>
	import '../app.css';
	import { navigating, page, session } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';
	import api from '$api';
	import { t } from '$lib/i18n';
	import { cart, sidebar, locale, media, authenticated, confirmed } from '$lib/stores';
	import Footer from '$components/footer/Footer.svelte';
	import Header from '$components/header/Header.svelte';
	import Sidebar from '$elements/sidebar/Sidebar.svelte';
	import MoonLoading from '$components/loading/MoonLoading.svelte';
	import Notification, { notifications } from '$elements/notification/Notification.svelte';
	import Toolbar from '$components/toolbar/Toolbar.svelte';
	import Modal, { modal } from '$elements/modal/Modal.svelte';
	import { isRoutePrivate } from '$utils/url.util';
	import AuthModal from '$components/modals/AuthModal.svelte';
	import { get } from 'svelte/store';
	import ConfirmationEmailModal from '$components/modals/ConfirmationEmailModal.svelte';

	$: {
		if (!$cart) {
			cart.useLocalStorage();
		}
	}

	$: {
		if ($navigating && $sidebar) {
			$sidebar = null;
		}
	}

	$: !$locale && locale.useLocalStorage();
	$: $authenticated = $session.authenticated;
	$: $confirmed = $session.user?.confirmed;

	beforeNavigate((navigation) => {
		if (isRoutePrivate(navigation.to.pathname) && !$authenticated) {
			if (navigation.from.pathname !== '/authentication') {
				modal.open({ component: AuthModal, props: { title: $t('auth.not-authenticated') } });
			}
			navigation.cancel();
		} else if (isRoutePrivate(navigation.to.pathname) && !$confirmed) {
			modal.open(ConfirmationEmailModal, {
				noCloseOnEsc: true,
				noCloseOnOuterClick: true
			});
			navigation.cancel();
		}
	});
</script>

<Notification />
<Modal />
<Sidebar />
{#if $page.url.pathname === '/checkout'}
	<slot />
{:else}
	<Header />
	<div class="overflow-y-auto flex flex-col h-full">
		<main class="flex flex-col grow relative">
			{#if $navigating}
				<MoonLoading />
			{:else}
				<slot />
			{/if}
		</main>
		{#if !$media.mobile}
			<Footer />
		{/if}
	</div>
	<Toolbar />
{/if}
