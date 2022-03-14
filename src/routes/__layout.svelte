<script>
	import '../app.css';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { navigating, page } from '$app/stores';
	import api from '$api';
	import { cart, sidebar, locale, user, jwt, profile, media, categories } from '$lib/stores';
	import Footer from '$components/footer/Footer.svelte';
	import Header from '$components/header/Header.svelte';
	import Sidebar from '$elements/sidebar/Sidebar.svelte';
	import MoonLoading from '$components/loading/MoonLoading.svelte';
	import Notification from '$elements/notification/Notification.svelte';
	import Toolbar from '$components/toolbar/Toolbar.svelte';
	import Modal from '$elements/modal/Modal.svelte';
import { serverUrl } from '$lib/utils/url.util';

	const exceptRoute = ["my-account", "search"];
	const filters = writable(new Map());
	setContext('filters', filters);
    $: console.log(serverUrl);

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
