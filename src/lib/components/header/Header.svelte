<script>
  // import { locale } from '$lib/stores';
  import { media } from "$lib/stores";
  import MenuNav from "../nav/MenuNav.svelte";
  import CartNav from "../nav/CartNav.svelte";
  import SearchProducts from "../products/SearchProducts.svelte";
  import Brand from "../../elements/brand/Brand.svelte";
  import AuthNav from "../nav/AuthNav.svelte";
  import Logo from "../../elements/logo/Logo.svelte";
</script>

<header class="hidden md:inline bg-neutral-light text-neutral-dark body-font">
  <div class="container mx-auto flex-center-middle py-5">
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
    <MenuNav />
    <CartNav />
    <AuthNav />
  </div>
</header>