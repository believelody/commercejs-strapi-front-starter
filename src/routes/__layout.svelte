<script context="module">
	export async function load({ fetch, url, session }) {
		if (isRoutePrivate(url.pathname) && !session.authenticated) {
			const translate = get(t);
			modal.open({ component: AuthModal, props: { title: translate('auth.not-authenticated') } });
			return {
				status: 307,
				redirect: '/'
			};
		}
		// if (!stuff.profile) {
		// 	const res =
		// }
		authenticated.set(!!session.authenticated);
		return {
			stuff:
				session.user && session.authenticated
					? {
							user: session.user,
							authenticated: session.authenticated
					  }
					: {}
		};
	}
</script>

<script>
	import '../app.css';
	import { navigating, page, session } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';
	import api from '$api';
	import { t } from '$lib/i18n';
	import { cart, sidebar, locale, media, authenticated } from '$lib/stores';
	import Footer from '$components/footer/Footer.svelte';
	import Header from '$components/header/Header.svelte';
	import Sidebar from '$elements/sidebar/Sidebar.svelte';
	import MoonLoading from '$components/loading/MoonLoading.svelte';
	import Notification from '$elements/notification/Notification.svelte';
	import Toolbar from '$components/toolbar/Toolbar.svelte';
	import Modal, { modal } from '$elements/modal/Modal.svelte';
	import { isRoutePrivate } from '$lib/utils/url.util';
	import AuthModal from '$lib/components/modals/AuthModal.svelte';
	import { get } from 'svelte/store';

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
	// $: !Object.values($user).some((v) => v) && user.useLocalStorage();
	// $: !$jwt && jwt.useLocalStorage();
	// $: {
	// 	if (!$profile) {
	// 		if ($user.confirmed) {
	// 			api.auth.getMe();
	// 		} else {
	// 			profile.useLocalStorage();
	// 		}
	// 	}
	// }
	$: console.log('$session : ', $session);
	beforeNavigate((navigation) => {
		if (isRoutePrivate(navigation.to.pathname) && !$authenticated) {
			modal.open({ component: AuthModal, props: { title: $t('auth.not-authenticated') } });
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
			{#if $navigating && !isRoutePrivate($page.url.pathname)}
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
