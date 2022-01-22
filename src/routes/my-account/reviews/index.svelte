<script>
    import { getContext, onMount } from "svelte";
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import { navigating } from '$app/stores';
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import { orders } from '$lib/stores';
    import HeaderTitle from '$lib/components/header/HeaderTitle.svelte';
    import MoonLoading from "../../../lib/components/loading/MoonLoading.svelte";
import AddReviewModal from "../../../lib/components/modal/AddReviewModal.svelte";

    let reviews = [], orderItems = [], userOrders = [], loading = true;
    const { open } = getContext("simple-modal");

    async function getReviewsFromUser() {
        loading = true;
        const res = await api.review.getFromUser();
        reviews = res.success ? res.reviews : [];
        loading = false;
    }

    async function getOrders() {
        const res = await api.order.getAll();
        return res.success ? res.orders : [];
    }

    async function getIdProductsFromOrders() {
        loading = true;
        userOrders = $orders.length ? $orders : await getOrders();
        userOrders.forEach(userOrder => {
            for (let orderItem of userOrder.order.line_items) {
                if (!orderItems.some(orderItem => orderItem.id === orderItem.id)) {
                    orderItems.push(orderItem);
                }
            }
        });
        loading = false;
    }

    function openReviewModal(item) {
        open(AddReviewModal, { item });
    }

    onMount(async () => {
        if (!orderItems.length) {
            await getIdProductsFromOrders();
        }
        if (!reviews.length) {
            await getReviewsFromUser()
        }
    });
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
                    <Tab>{$t("review.tabs.pending")}</Tab>
                    <Tab>{$t("review.tabs.done")}</Tab>
                </TabList>

                <TabPanel>
                    <ul>
                        {#each orderItems as item}
                            <li class="w-full border flex items-center px-4">
                                <section class="w-1/2 flex flex-col">
                                    <span class="text-lg text-gray-800">{item.product_name}</span>
                                    {#each item.variants as variant}
                                        <span class="text-sm text-gray-600">{variant.variant_name} : {variant.option_name}</span>
                                    {/each}
                                </section>
                                <section class="w-1/2">
                                    <button on:click={() => openReviewModal(item)} class="w-full py-2 px-auto text-indigo-700 border border-indigo-500 rounded hover:text-white hover:bg-indigo-500 hover:border-none">
                                        {$t("review.button.add")}
                                    </button>
                                </section>
                            </li>
                        {/each}
                    </ul>
                </TabPanel>
                <TabPanel>
                    <ul>
                        {#each reviews as review}
                            <li class="w-full">
                            </li>
                        {:else}
                            <section class="rounded mt-6 flex justify-center">
                                <span>{$t("review.empty.text")}</span>
                            </section>
                        {/each}
                    </ul>
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