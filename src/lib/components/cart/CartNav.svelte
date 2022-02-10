<script>
    import { cart, sidebar, media } from "$lib/stores";
    import CartSidebar from "./CartSidebar.svelte";
    import CartIcon from "../svg/CartIcon.svelte";

    function toggleCart() {
        $sidebar = !$sidebar ? CartSidebar : null
    }
</script>

<button on:click={toggleCart} class="flex cursor-pointer items-center justify-center min-w-max md:px-4 py-2 bg-transparent md:bg-indigo-500 rounded">
    <CartIcon />
    {#if !$media.mobile || $cart?.total_unique_items}
        <span class="text-gray-900 title-font text-lg font-medium ml-4 bg-white rounded-full px-2">{$cart?.total_unique_items ?? 0}</span>
    {/if}
</button>