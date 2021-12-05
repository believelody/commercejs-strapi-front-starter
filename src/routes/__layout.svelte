<script>
	import '../app.css';
	// import "../styles/tailwind-output.css";
	import Modal from 'svelte-simple-modal';
	import { navigating, page } from '$app/stores';
	import { cart, sidebar, locale, user, jwt, profile } from '$lib/stores';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import MoonLoading from '../lib/components/loading/MoonLoading.svelte';

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
	$: !$profile && profile.useLocalStorage();
</script>

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
			{#if $navigating && !$page.path.includes("/my-account")}
				<MoonLoading />
			{:else}
				<slot />
			{/if}
		</main>
		<Footer />
	{/if}
</Modal>

<style>
	main {
		flex: 1 0 auto;
		position: relative;
	}
</style>
