<script>
  import {getContext} from "svelte";
  import { goto } from '$app/navigation';
  import { t } from "$lib/i18n";
  import { jwt } from '$lib/stores';
  // import { locale } from '$lib/stores';
  import Nav from "../nav/Nav.svelte";
  import CartNav from "../cart/CartNav.svelte";
  import UserCircleIcon from "../svg/UserCircleIcon.svelte";
  import ShortRightArrowIcon from "../svg/ShortRightArrowIcon.svelte";
  import AuthModal from "../modal/AuthModal.svelte";

  const { open } = getContext("simple-modal");

  function showLoginModal() {
    open(AuthModal);
  }
</script>

<header class="bg-gray-100 text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a href="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-xl">PetsLover</span>
    </a>
      <!-- <select bind:value={$locale}>
      {#each locales as l}
        <option value={l}>{l}</option>
      {/each}
    </select> -->
    <Nav />
    <div class="flex">
      <CartNav />
      {#if $jwt}
        <a href="/my-account" class="inline-flex items-center lg:justify-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          <UserCircleIcon color="gray-600" />
          <span>{$t("header.my-account")}</span>
      </a>
      {:else}
        <button on:click={showLoginModal} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          {$t("header.connexion")}
          <ShortRightArrowIcon color="gray-600" size={4} />
      </button>
      {/if}
    </div>
  </div>
</header>