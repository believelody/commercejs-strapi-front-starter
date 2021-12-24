<script>
    import { onMount } from 'svelte';
    import { navigating, page } from '$app/stores';
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import MoonLoading from '../../../lib/components/loading/MoonLoading.svelte';
    import HeaderTitle from '../../../lib/components/header/HeaderTitle.svelte';
import Accordion from '../../../lib/components/accordion/Accordion.svelte';
    
    let order = null, error = null;

    async function getOne() {
        const res = await api.order.getOne($page.params.reference);
        if (res.success) {
            order = res.order;
        } else {
            error = res.error
        }
    }

    onMount(async () => {
        if (!order) {
            await getOne();
        }
    });
</script>

<style>
    /* your styles go here */
</style>

{#if $navigating || !order}
    <MoonLoading />
{:else}
    <HeaderTitle title={`${$t("order.account.table.header.reference")} ${order.customer_reference}`} />
    <Accordion isOpen>
        <h3 slot="header" class="text-xl">Shipping</h3>
        <pre slot="content">{JSON.stringify(order.shipping, null, 2)}</pre>
    </Accordion>
{/if}