<script>
	import '../app.css';
	import '../styles/tailwind-output.css';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { navigating, page } from '$app/stores';
	import api from '$lib/api';
	import { cart, sidebar, locale, user, jwt, profile, media, categories } from '$lib/stores';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Sidebar from '$lib/elements/sidebar/Sidebar.svelte';
	import MoonLoading from '$lib/components/loading/MoonLoading.svelte';
	import Notification from '$lib/elements/notification/Notification.svelte';
	import Toolbar from '$lib/components/toolbar/Toolbar.svelte';
	import Modal from '$lib/elements/modal/Modal.svelte';

	const exceptRoute = ["my-account", "search"];
	const filters = writable(new Map());
	setContext('filters', filters);

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
	$: !Object.values($user).some((v) => v) && user.useLocalStorage();
	$: !$jwt && jwt.useLocalStorage();
	$: {
		if (!$profile) {
			if (!profile.useLocalStorage() && $user.confirmed) {
				api.auth.getMe();
			} else {
				profile.useLocalStorage();
			}
		}
	}
</script>

<Notification />
<Modal />
<Sidebar />
{#if $page.url.pathname === '/checkout'}
	<slot />
{:else}
	<Header />
	<div class="overflow-y-auto flex flex-col h-full">
		<main class="flex flex-col flex-grow relative">
			{#if ($navigating && !exceptRoute.some((route) => $page.url.pathname.includes(route))) || !jwt}
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
