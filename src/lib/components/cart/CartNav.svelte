<script>
    import { cart, sidebar } from "$lib/stores";
    import CartSidebar from "./CartSidebar.svelte";
    import CartIcon from "../svg/CartIcon.svelte";

    function toggleCart() {
        $sidebar = !$sidebar ? CartSidebar : null
    }
</script>

<nav on:click={toggleCart} class="flex cursor-pointer items-center px-4 py-2 bg-indigo-500 rounded">
    <CartIcon />
    <span class="text-gray-900 title-font text-lg font-medium ml-4 bg-white rounded-full px-2">{$cart?.total_unique_items ?? 0}</span>
</nav>