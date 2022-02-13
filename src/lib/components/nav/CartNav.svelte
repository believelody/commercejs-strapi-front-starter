<script>
    import { cart, sidebar, media } from "$lib/stores";
    import CartSidebar from "../sidebars/CartSidebar.svelte";
    import CartIcon from "../../elements/icon/CartIcon.svelte";
    import PrimaryButton from "../../elements/button/PrimaryButton.svelte";

    function toggleCart() {
        $sidebar = !$sidebar ? CartSidebar : null
    }
</script>

<PrimaryButton on:click={toggleCart}>
    <CartIcon />
    {#if !$media.mobile || $cart?.total_unique_items}
        <span class="text-gray-900 title-font text-lg font-medium ml-4 bg-white rounded-full px-2">{$cart?.total_unique_items ?? 0}</span>
    {/if}
</PrimaryButton>