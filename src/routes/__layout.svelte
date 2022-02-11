<script>
	import '../app.css';
	// import "../styles/tailwind-output.css";
	import Modal from 'svelte-simple-modal';
	import Notifications from 'svelte-notifications';
	import { navigating, page } from '$app/stores';
	import api from '$lib/api';
	import { cart, sidebar, locale, user, jwt, profile, media } from '$lib/stores';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import MoonLoading from '$lib/components/loading/MoonLoading.svelte';
	import Notification from "$lib/components/notifications/Notification.svelte";
	import Toolbar from '../lib/components/toolbar/Toolbar.svelte';

	const exceptRoute = [/\/my-account/];

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
	$: !Object.values($user).some(v => v) && user.useLocalStorage();
	$: !$jwt && jwt.useLocalStorage();
	$: {
		if (!$profile) {
			if (!profile.useLocalStorage() && $user.confirmed) {
				api.auth.getMe();
			} else {
				profile.useLocalStorage();
			}
		}
	};
</script>

<Notifications item={Notification} withoutStyles>
	<Modal
		on:opening={() => console.log("opening")}
		on:opened={() => console.log("opened")}
		on:close={() => console.log("close")}
		on:closing={() => console.log("closing")}
		on:closed={() => console.log("closed")}
	>
		<Sidebar />
		{#if $page.url.pathname === '/checkout'}
			<slot />
		{:else}
			<Header />
			<div class="overflow-y-auto flex flex-col h-full">
				<main class="flex flex-col flex-grow relative">
					{#if ($navigating && !exceptRoute.some(route => $page.url.pathname.match(route)) || !jwt)}
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
	</Modal>
</Notifications>
