<script>
    import { onMount } from 'svelte';
    import { navigating, page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { paginate, PaginationNav } from 'svelte-paginate';
    import api from '$lib/api';
    import { t } from '$lib/i18n';
    import { orders } from '$lib/stores';
    import HeaderTitle from '../../../lib/components/header/HeaderTitle.svelte';
    import MoonLoading from '../../../lib/components/loading/MoonLoading.svelte';
    import FilePDFIcon from '../../../lib/components/svg/FilePDFIcon.svelte';

    let error = null, loading = false, currentPage = +$page.query.get("page"), pageSize = 6;

    async function getAll() {
        loading = true;
        const res = await api.order.getOrders();
        if (res.success) {
            $orders = res.orders;
        } else {
            error = res.error;
        }
        loading = false;
    }

    function setPage({ detail }) {
        currentPage = detail.page;
        goto(`orders?page=${detail.page}`);
    }

    onMount(async () => {
        if (!$orders.length) {
            await getAll();
        }
    });

    $: paginatedOrders = $orders.length && paginate({ items: $orders, pageSize, currentPage });
</script>

{#if (loading || $navigating) && !$orders.length}
    <MoonLoading />
{:else}
    <HeaderTitle title={$t("order.account.title")} />
    <div class="relative w-full lg:w-4/5">
        {#if $orders.length}
            <table class="border shadow-md rounded bg-white w-full">
                <thead class="border-b">
                    <tr>
                        <th class="w-2/16">{$t("order.account.table.header.reference")}</th>
                        <th class="w-4/16">{$t("order.account.table.header.date")}</th>
                        <th class="w-2/16">{$t("order.account.table.header.price")}</th>
                        <!-- <th class="w-4/16">{$t("order.account.table.header.shipping")}</th> -->
                        <th class="w-4/16">{$t("order.account.table.header.tracking")}</th>
                        <th class="w-3/16">{$t("order.account.table.header.fulfillment")}</th>
                        <th>{$t("order.account.table.header.details")}</th>
                    </tr>
                </thead>
                <tbody>
                    {#each paginatedOrders as order}
                        <tr class="rounded my-2 border">
                            <td class="border w-2/16">
                                <span class="flex justify-center">{order.customer_reference.split("-")[1]}</span>
                            </td>
                            <td class="border w-4/16 px-1 text-center">
                                {new Date(order.transactions[0].charge_date).toLocaleDateString()}
                            </td>
                            <td class="border w-2/16 text-center">{order.order_value.formatted_with_symbol}</td>
                            <!-- <td class="border w-4/16 px-1">
                                <section class="flex flex-col">
                                    <span>{order.shipping.street}</span>
                                    {#if order.shipping.street_2}
                                        <span>{order.shipping.street_2}</span>
                                    {/if}
                                    <span>{order.shipping.town_city} {order.shipping.postal_zip_code}</span>
                                    {#if order.shipping.county_state}
                                        <span>{order.shipping.county_state}</span>
                                    {/if}
                                    <span>{$t(`country.${order.shipping.country.toLowerCase()}`)}</span>
                                </section>
                            </td> -->
                            <td></td>
                            <td class="border w-3/16 text-center">{$t("order.account.table.body.not-fulfill")}</td>
                            <td class="p-1">
                                <section class="flex flex-col items-center">
                                    <button class="bg-green-400 rounded py-1 px-3">{$t("order.account.table.body.button.re-order")}</button>
                                    <a href={`/orders/${order.id}`} class="underline font-medium">{$t("order.account.table.body.button.view")}</a>
                                    <button class="border border-blue-500 rounded px-4 flex items-center">
                                        <FilePDFIcon size={4} color="blue-500" />
                                        <span class="ml-2">{$t("order.account.table.body.button.bill")}</span>
                                    </button>
                                </section>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <section class="flex justify-center mt-8">
                <PaginationNav
                    totalItems={$orders.length}
                    {pageSize}
                    {currentPage}
                    limit={1}
                    showStepOptions
                    on:setPage={setPage}
                />
            </section>
        {:else}
            <section class="rounded p-6 my-2 mx-auto h-24 bg-indigo-200 flex flex-col justify-center">
                <span>{$t("order.empty.text")}</span>
                <a href="/" class="underline hover:text-blue-700">{$t("order.empty.link")}</a>
            </section>
        {/if}
    </div>
{/if}

<style>
    :global(.pagination-nav) {
        display: flex;
        justify-content: space-between;
    }
    :global(.number) {
        margin: 0 8px;
        cursor: pointer;
    }
    :global(.prev), :global(.next) {
        cursor: pointer;
    }
    :global(.active) {
        text-decoration: underline;
        font-weight: bold;
    }
</style>