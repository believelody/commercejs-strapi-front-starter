<script context="module">
	export async function load({ url, session }) {
		let authorize = !!session.authenticated;
		let user;
		if (!authorize) {
			const res = await api.client.get('users/me');
			if (res.error) {
				return {
					props: { error: res.error }
				};
			}
			authorize = res.success;
			user = res.user;
		}
		if (isRoutePrivate(url.pathname) && !authorize) {
			// const translate = get(t);
			// modal.open({ component: AuthModal, props: { title: translate('auth.not-authenticated') } });
			return {
				status: 302,
				redirect: '/authentication'
			};
		}
		return {
			props: { user, authenticated: authorize }
		};
	}
</script>

<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { navigating, page, session } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';
	import api from '$api';
	import { t } from '$lib/i18n';
	import { cart, sidebar, locale, media } from '$lib/stores';
	import Footer from '$components/footer/Footer.svelte';
	import Header from '$components/header/Header.svelte';
	import Sidebar from '$elements/sidebar/Sidebar.svelte';
	import MoonLoading from '$components/loading/MoonLoading.svelte';
	import Notification from '$elements/notification/Notification.svelte';
	import Toolbar from '$components/toolbar/Toolbar.svelte';
	import Modal, { modal } from '$elements/modal/Modal.svelte';
	import { isRoutePrivate } from '$utils/url.util';
	import AuthModal from '$components/modals/AuthModal.svelte';
	import ConfirmationEmailModal from '$components/modals/ConfirmationEmailModal.svelte';

	export let error, user, authenticated;

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

	onMount(() => {
		$session = { ...$session, user, authenticated };
	});

	beforeNavigate((navigation) => {
		if (isRoutePrivate(navigation.to.pathname) && !$session.authenticated) {
			if (navigation.from.pathname !== '/authentication') {
				modal.open({ component: AuthModal, props: { title: $t('auth.not-authenticated') } });
			}
			navigation.cancel();
		} else if (isRoutePrivate(navigation.to.pathname) && !$session.user?.confirmed) {
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
