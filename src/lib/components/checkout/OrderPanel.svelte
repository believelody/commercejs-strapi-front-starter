<script>
import { getContext } from 'svelte';

    import OrderSummary from './OrderSummary.svelte';

    export let checkout;
</script>

<style>
    /* your styles go here */
</style>

<div class="lg:w-2/5 h-screen bg-white hidden lg:flex lg:flex-col">
    <OrderSummary {checkout} />
</div>