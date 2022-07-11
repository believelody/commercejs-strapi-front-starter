<script>
  // import { locale } from '$lib/stores';
  import { media } from "$lib/stores";
  import MenuNav from "../nav/MenuNav.svelte";
  import CartNav from "../nav/CartNav.svelte";
  import SearchProducts from "../products/SearchProducts.svelte";
  import Brand from "$elements/brand/Brand.svelte";
  import AuthNav from "../nav/AuthNav.svelte";
  import Logo from "$elements/logo/Logo.svelte";
</script>

<header class="hidden md:border-b md:inline">
  <div class="mx-auto flex-center-middle md:py-2 text-neutral-dark body-font bg-neutral-light-2">
      <a href="/" sveltekit:prefetch>
          {#if $media.tablet}
              <div class="px-2">
                  <Logo/>
              </div>
          {:else}
              <Brand/>
          {/if}
      </a>
      <!-- <select bind:value={$locale}>
      {#each locales as l}
        <option value={l}>{l}</option>
      {/each}
      </select> -->
    <SearchProducts transparent withoutShadow />
    <MenuNav />
    <CartNav />
    <AuthNav />
  </div>
</header>