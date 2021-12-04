<script context="module">
    import api from '$lib/api';
    
    export async function load() {
        const res = await api.order.getOrders();

        if (res.error) {
            return {
                props: { error: res.error }
            };
        }

        return {
            props: {
                orders: res.orders,
                pagination: res.meta.pagination
            }
        }
    }
</script>
<script>
    import { t } from '$lib/i18n';
    import CenterSection from '$lib/components/center-section/CenterSection.svelte';
import HeaderTitle from '../../../lib/components/header/HeaderTitle.svelte';

    export let orders = [], pagination = null, error = null;
</script>

<div class="relative bg-indigo-100 flex flex-col h-full pb-2">
    <HeaderTitle title={$t("order.account.title")} />
    <ul class="border bg-white mx-2 shadow-md rounded h-full flex flex-col lg:flex-row items-center justify-center">
        {#each orders as order}
            <li class="w-full lg:w-1/2"></li>
        {:else}
            <CenterSection class="rounded p-6 w-auto bg-indigo-200 flex flex-col justify-center">
                <span>{$t("order.empty.text")}</span>
                <a href="/" class="underline hover:text-blue-700">{$t("order.empty.link")}</a>
            </CenterSection>
        {/each}
    </ul>
</div>