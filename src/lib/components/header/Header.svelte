<script>
  // import { locale } from '$lib/stores';
  import Nav from "../nav/Nav.svelte";
  import CartNav from "../cart/CartNav.svelte";
  import SearchProducts from "../products/SearchProducts.svelte";
  import Logo from "../display/Logo.svelte";
  import AuthNav from "../nav/AuthNav.svelte";
</script>

<header class="hidden md:inline bg-gray-100 text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Logo />
      <!-- <select bind:value={$locale}>
      {#each locales as l}
        <option value={l}>{l}</option>
      {/each}
    </select> -->
    <SearchProducts />
    <Nav />
    <CartNav />
    <AuthNav class="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded" />
  </div>
</header>