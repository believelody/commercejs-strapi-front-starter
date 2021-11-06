<script>
	import '../app.css';
	// import "../styles/tailwind-output.css";
	import { Moon } from 'svelte-loading-spinners';
	import Modal from 'svelte-simple-modal';
	import { navigating, page } from '$app/stores';
	import { cart, modal, sidebar, locale } from '$lib/stores';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';

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
</script>

<Modal show={$modal} />
<Sidebar />
{#if $page.path === '/checkout'}
	<slot />
{:else}
	<Header />
	<main>
		{#if $navigating}
			<section>
				<Moon size="260" color="#FF3E00" unit="px" />
			</section>
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
	section {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
	}
</style>
