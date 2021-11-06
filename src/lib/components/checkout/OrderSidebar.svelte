<script>
    import OrderSummary from "./OrderSummary.svelte";

    export let checkout;
</script>

<style>
    /* your styles go here */
</style>

<div class="w-screen sm:w-auto h-screen bg-white flex flex-col">
    <OrderSummary {checkout} />
</div>