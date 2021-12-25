<script>
	import '../app.css';
	// import "../styles/tailwind-output.css";
	import Modal from 'svelte-simple-modal';
	import Notifications from 'svelte-notifications';
	import { navigating, page } from '$app/stores';
	import api from '$lib/api';
	import { cart, sidebar, locale, user, jwt, profile } from '$lib/stores';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import MoonLoading from '$lib/components/loading/MoonLoading.svelte';
	import Notification from "$lib/components/notifications/Notification.svelte";

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
		on:open={() => console.log("open")}
		on:opening={() => console.log("opening")}
		on:opened={() => console.log("opened")}
		on:close={() => console.log("close")}
		on:closing={() => console.log("closing")}
		on:closed={() => console.log("closed")}
	>
		<Sidebar />
		{#if $page.path === '/checkout'}
			<slot />
		{:else}
			<Header />
			<main>
				{#if ($navigating && !$page.path.includes("/my-account")) || !jwt}
					<MoonLoading />
				{:else}
					<slot />
				{/if}
			</main>
			<Footer />
		{/if}
	</Modal>
</Notifications>

<style>
	main {
		flex: 1 0 auto;
		position: relative;
	}
</style>
