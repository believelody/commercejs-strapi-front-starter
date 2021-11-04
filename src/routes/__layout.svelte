<script>
	import '../app.css';
	// import "../styles/tailwind-output.css";
  import { Moon } from 'svelte-loading-spinners';
  import Modal from 'svelte-simple-modal';
  import { navigating } from '$app/stores';
  import { cart, modal, sidebar } from "$lib/stores";
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';

  $: {
    if (!$cart) {
      cart.useLocalStorage();
    }
  };

  $: {
    if ($navigating) {
      $sidebar = null;
    }
  }
</script>

<Header />
<main>
  <Modal show={$modal} />
  <Sidebar />
  {#if $navigating}
    <section>
      <Moon size="260" color="#FF3E00" unit="px" />
    </section>
  {:else}
    <slot />
  {/if}
</main>
<Footer />

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