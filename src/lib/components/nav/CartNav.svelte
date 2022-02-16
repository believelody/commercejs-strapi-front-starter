<script>
    import { cart, media } from "$lib/stores";
    import CartSidebar from "../sidebars/CartSidebar.svelte";
    import CartIcon from "$lib/elements/icon/CartIcon.svelte";
    import PrimaryButton from "$lib/elements/button/PrimaryButton.svelte";
    import { openSidebar } from "$lib/context/sidebar";

    function toggleCart() {
        openSidebar({ component: CartSidebar });
    }
</script>

<PrimaryButton on:click={toggleCart} class="bg-{$media.mobile ? 'transparent' : 'current'}">
    <CartIcon />
    {#if $cart?.total_unique_items}
        {#if $media.desktop}
            <span class="text-gray-900 title-font text-lg font-medium ml-4 bg-white rounded-full px-2">{$cart?.total_unique_items ?? 0}</span>
        {:else}
            <sup class="font-medium text-white text-lg rounded-full">
                {$cart?.total_unique_items ?? 0}
            </sup>
        {/if}
    {/if}
</PrimaryButton>