<script>
    import { onMount } from 'svelte';
    import { navigating } from '$app/stores';
    import api from '$lib/api';
    import { t } from '$lib/i18n';
    import HeaderTitle from '../../../lib/components/header/HeaderTitle.svelte';
    import MoonLoading from '../../../lib/components/loading/MoonLoading.svelte';

    let orders = [], pagination = null, error = null, loading = true;

    async function getAll() {
        loading = true;
        const res = await api.order.getOrders();
        console.log(res);
        if (res.success) {
            orders = res.orders;
            pagination = res.pagination;
        } else {
            error = res.error;
        }
        loading = false;
    }

    onMount(async () => {
        await getAll();
    });
</script>

{#if loading || $navigating}
    <MoonLoading />
{:else}
<div class="bg-indigo-100 flex flex-col h-full pb-2">
    <HeaderTitle title={$t("order.account.title")} />
    <ul class="relative border bg-white mx-2 shadow-md rounded h-full flex flex-wrap">
        {#each orders as order}
            <li class="w-full lg:w-1/2">
                <pre>{JSON.stringify(order, null, 2)}</pre>
            </li>
        {:else}
            <section class="rounded p-6 my-2 mx-auto h-24 bg-indigo-200 flex flex-col justify-center">
                <span>{$t("order.empty.text")}</span>
                <a href="/" class="underline hover:text-blue-700">{$t("order.empty.link")}</a>
            </section>
        {/each}
    </ul>
</div>
{/if}