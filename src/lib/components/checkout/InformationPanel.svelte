<script>
    import { t } from '$lib/i18n';
    import { sidebar, shipping, checkout } from '$lib/stores'
    import OrderSidebar from './OrderSidebar.svelte';
    import Addresses from './Addresses.svelte';
    import Identity from './Identity.svelte';
    import Payment from './Payment.svelte';
    import ArrowRightIcon from '../svg/ArrowRightIcon.svelte';
    import { getContext } from 'svelte';
    import ShippingMethods from './ShippingMethods.svelte';

    function showSidebar() {
        $sidebar = OrderSidebar
    }

    function pay() {
        console.log($shipping);
    }

    // $: checkout = getContext("checkout");
</script>

<style>
    /* your styles go here */
</style>

    <div class="lg:w-3/5 w-full bg-indigo-50 h-screen flex flex-col">
    <div class="flex items-center justify-end lg:hidden border-b border-indigo-200">
        <button on:click={showSidebar} class="flex items-center hover:bg-indigo-200 px-4 py-2 text-indigo-500 text-md">
            <span class="mr-4">{$t("checkout.check-summary")}</span>
            <ArrowRightIcon color="indigo-400" size={5} />
        </button>
    </div>
    <div class="flex flex-col flex-grow overflow-y-hidden">
        <div class="h-full overflow-y-auto">
            <Identity />
            <Addresses />
            {#if $shipping.country}
                <ShippingMethods />
            {/if}
            <Payment />
        </div>
    </div>
    <button on:click={pay} class="px-4 py-4 bg-indigo-600 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors disabled:opacity-75 disabled:cursor-not-allowed">
        {$t("checkout.submit", { amount: $checkout.live.total.formatted_with_symbol })}
    </button>
</div>