<script>
    import { onMount } from "svelte";
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import { navigating } from '$app/stores';
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import { orders } from '$lib/stores';
    import HeaderTitle from '$lib/components/header/HeaderTitle.svelte';
    import MoonLoading from "../../../lib/components/loading/MoonLoading.svelte";

    let orderProducts = [], userOrders = [], loading = true;

    async function getReviewsFromOrder() {
        let reviews = [];
        for await (const item of orderProducts) {
            const res = await api.review.getFromProductId(item.id);
            if (res.success) {
                reviews.push(res.review);
            }
        }
        return reviews;
    }

    async function getOrders() {
        const res = await api.order.getAll();
        if (res.success) {
            console.log(res.orders);
            return res.orders;
        } else {
            error = res.error;
            return [];
        }
    }

    async function getIdProductsFromOrders() {
        loading = true;
        userOrders = $orders.length ? $orders : await getOrders();
        console.log(userOrders);
        userOrders.forEach(item => {
            for (let orderItem of item.order.line_items) {
                if (!orderProducts.some(product => product.id === orderItem.id)) {
                    orderProducts.push(orderItem);
                }
            }
        });
        loading = false;
    }

    onMount(async () => {
        if (!orderProducts.length) {
            await getIdProductsFromOrders();
        }
    });
    $: console.log($orders.length);
</script>

<style>
    :global(.svelte-tabs) {
        width: 100%;
    }
    :global(.svelte-tabs .svelte-tabs__tab-list) {
        display: flex;
        box-sizing: border-box;
    }
    :global(.svelte-tabs li.svelte-tabs__tab) {
        flex: 1 0 0;
    }
    :global(.svelte-tabs li.svelte-tabs__selected) {
		border-bottom: 2px solid #4338ca;
        color: #4338ca;
    }
</style>

{#if loading || $navigating}
    <MoonLoading />
{:else}
    <HeaderTitle title={$t("review.account.title")} />
    <div class="relative border w-full bg-white mx-2 shadow-md rounded h-full">
        {#if userOrders.length}
            <Tabs>
                <TabList>
                    <Tab>Articles en attente d'avis</Tab>
                    <Tab>Mes avis déposés</Tab>
                </TabList>

                <TabPanel>
                    <ul>
                        {#each orderProducts as item}
                            <li class="w-full border flex items-center px-4">
                                <section class="w-1/2 flex flex-col">
                                    <span class="text-lg text-gray-800">{item.product_name}</span>
                                    {#each item.variants as variant}
                                        <span class="text-sm text-gray-600">{variant.variant_name} : {variant.option_name}</span>
                                    {/each}
                                </section>
                                <section class="w-1/2">
                                    <button class="w-full py-2 px-auto text-indigo-700 border border-indigo-500 rounded hover:text-white hover:bg-indigo-500 hover:border-none">{$t("review.button.add")}</button>
                                </section>
                            </li>
                        {:else}
                            <section class="rounded p-6 my-2 mx-auto h-24 bg-indigo-200 flex flex-col justify-center">
                                <span>{$t("review.empty.text")}</span>
                                <a href="orders?page=1" class="underline hover:text-blue-700">{$t("review.empty.link")}</a>
                            </section>
                        {/each}
                    </ul>
                </TabPanel>
                <TabPanel>
                    {#await getReviewsFromOrder()}
                        <MoonLoading />
                    {:then reviews}
                        <ul>
                            {#each reviews as review}
                                <li class="w-full">
                                </li>
                            {:else}
                                <section class="rounded p-6 my-2 mx-auto h-24 bg-indigo-200 flex flex-col justify-center">
                                    <span>{$t("review.empty.text")}</span>
                                </section>
                            {/each}
                        </ul>
                    {/await}
                </TabPanel>
            </Tabs>
        {:else}
            <section class="rounded p-6 my-2 mx-auto h-24 bg-indigo-200 flex flex-col justify-center">
                <span>{$t("review.empty.text")}</span>
                <a href="/" class="underline hover:text-blue-700">{$t("review.empty.link")}</a>
            </section>
        {/if}
    </div>       
{/if}