<script>
    import { getContext, onMount } from "svelte";
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
    import { navigating } from '$app/stores';
    import { goto } from "$app/navigation";
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import { orders, reviews } from '$lib/stores';
    import HeaderTitle from '$lib/components/header/HeaderTitle.svelte';
    import MoonLoading from "../../../lib/components/loading/MoonLoading.svelte";
    import AddReviewModal from "../../../lib/components/modal/AddReviewModal.svelte";
    import Star from "../../../lib/components/star/Star.svelte";
    import { baseUrl } from "../../../lib/utils/url.util";
import { localDateFromString } from "../../../lib/utils/date.util";

    let orderItems = [], userOrders = [], loading = true;
    const { open } = getContext("simple-modal");

    async function getReviewsFromUser() {
        loading = true;
        const res = await api.review.getFromUser();
        $reviews = res.success ? res.reviews : [];
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
            for (let userOrderItem of userOrder.order.line_items) {
                if (!orderItems.some(orderItem => orderItem.id === userOrderItem.id)) {
                    orderItems.push(userOrderItem);
                }
            }
        });
        loading = false;
    }

    async function goToProductPage(productId) {
        loading = true;
        const res = await api.product.getById(productId);
        if (res.success) {
            console.log(res.product);
            goto(`/products/${res.product.permalink}`);
        }
        loading = false;
    }

    function openReviewModal(item) {
        open(AddReviewModal, { item });
    }

    onMount(async () => {
        if (!orderItems.length) {
            await getIdProductsFromOrders();
        }
        if (!$reviews.length) {
            await getReviewsFromUser();
        }
    });

    $: if ($reviews.length) {
        getIdProductsFromOrders();
    }
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
                        {#each orderItems.filter(item => !$reviews.find(review => review.productId === item.product_id)) as item}
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
                        {:else}
                            <section class="rounded mt-6 flex justify-center">
                                <span>{$t("review.pending.text")}</span>
                            </section>
                        {/each}
                    </ul>
                </TabPanel>
                <TabPanel>
                    <ul>
                        {#each $reviews as review}
                            <li class="w-full flex flex-col border py-2">
                                <div class="w-full flex items-stretch px-4">
                                    <section class="flex flex-col  w-full">
                                        <div class="flex justify-between">
                                            <div class="flex items-center text-lg text-gray-800">
                                                <button on:click={() => goToProductPage(review.productId)} class="mr-4 border-none font-medium underline">{orderItems.find(item => item.product_id === review.productId).name}</button>
                                                <Star nb={review.ratings} />
                                            </div>
                                            <div class="text-lg italic text-gray-500">
                                                {localDateFromString(review.created_at)}
                                            </div>
                                        </div>
                                        {#each orderItems.find(item => item.product_id === review.productId).variants as variant}
                                            <div class="text-sm text-gray-600">{variant.variant_name} : {variant.option_name}</div>
                                        {/each}
                                    </section>
                                </div>
                                {#if review.description}
                                    <div class="px-4 flex">
                                        <h4 class="text-md font-medium mr-2">{$t("review.list.description")} :</h4>
                                        <p>{review.description}</p>
                                    </div>
                                {/if}
                                {#if review.images.length}
                                <div class="mt-2 flex flex-col px-4 w-full">
                                    <h4 class="text-md font-medium">{$t("review.list.images")} :</h4>
                                    <ul class="flex flex-wrap">
                                        {#each review.images as image}
                                            <li class="flex flex-col">
                                                <img class="w-24 h-24 object-cover" src={`${baseUrl}${image.url}`} alt={image.name} />
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                                {/if}
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