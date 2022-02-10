<script>
  // import { locale } from '$lib/stores';
  import { media } from "$lib/stores";
  import Nav from "../nav/Nav.svelte";
  import CartNav from "../cart/CartNav.svelte";
  import SearchProducts from "../products/SearchProducts.svelte";
  import Brand from "../brand/Brand.svelte";
  import AuthNav from "../nav/AuthNav.svelte";
  import Logo from "../logo/Logo.svelte";
</script>

<header class="hidden md:inline bg-gray-100 text-gray-600 body-font">
  <div class="container mx-auto flex py-5 items-center justify-center">
    <a href="/">
      {#if $media.tablet}
        <span class="px-2">
          <Logo />
        </span>
      {:else}
        <Brand />
      {/if}
    </a>
    <!-- <select bind:value={$locale}>
    {#each locales as l}
      <option value={l}>{l}</option>
    {/each}
    </select> -->
    <SearchProducts />
    <Nav />
    <CartNav />
    <AuthNav />
  </div>
</header>