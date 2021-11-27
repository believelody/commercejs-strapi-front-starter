<script>
	import '../app.css';
	// import "../styles/tailwind-output.css";
	import { Moon } from 'svelte-loading-spinners';
	import Modal from 'svelte-simple-modal';
	import { navigating, page } from '$app/stores';
	import { cart, modal, sidebar, locale, user, jwt } from '$lib/stores';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Loading from '../lib/components/loading/Loading.svelte';

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

	$: locale.useLocalStorage();
	$: user.useLocalStorage();
	$: jwt.useLocalStorage();
</script>

{#if $modal}
	<Modal {...$modal} />
{/if}
<Sidebar />
{#if $page.path === '/checkout'}
	<slot />
{:else}
	<Header />
	<main>
		{#if $navigating}
			<Loading>
				<Moon size="260" color="#FF3E00" unit="px" />
			</Loading>
		{:else}
			<slot />
		{/if}
	</main>
	<Footer />
{/if}

<style>
	main {
		flex: 1 0 auto;
		position: relative;
	}
</style>
