<script>
    import SidebarWrapper from "$elements/sidebar/SidebarWrapper.svelte";
    import OrderSummary from "./OrderSummary.svelte";
</script>

<style>
    /* your styles go here */
</style>

<SidebarWrapper>
    <OrderSummary slot="content" />
</SidebarWrapper>