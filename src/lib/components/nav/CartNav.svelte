<script>
    import { cart, media } from "$lib/stores";
    import CartSidebar from "../sidebars/CartSidebar.svelte";
    import CartIcon from "$elements/icon/CartIcon.svelte";
    import PrimaryButton from "$elements/button/PrimaryButton.svelte";
    import { openSidebar } from "$elements/sidebar/Sidebar.svelte";

    function toggleCart() {
        openSidebar({ component: CartSidebar });
    }
</script>

<PrimaryButton on:click={toggleCart} class="bg-{$media.mobile ? 'transparent' : 'current'}">
    <CartIcon strokeWidth={2} />
    {#if $cart?.total_unique_items}
        {#if $media.desktop}
            <span class="text-neutral-900 title-font text-lg font-medium ml-4 bg-white rounded-full px-2">{$cart?.total_unique_items ?? 0}</span>
        {:else}
            <sup class="font-medium text-white text-lg rounded-full">
                {$cart?.total_unique_items ?? 0}
            </sup>
        {/if}
    {/if}
</PrimaryButton>