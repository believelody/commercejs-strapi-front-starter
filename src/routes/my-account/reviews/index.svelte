<script>
    import { onMount } from "svelte";
    import { navigating } from '$app/stores';
    import { t } from '$lib/i18n';
    import api from '$api';
    import { orders, reviewsUser } from '$lib/stores';
    import HeaderTitle from '$components/header/HeaderTitle.svelte';
    import MoonLoading from "../../$components/loading/MoonLoading.svelte";
    import ReviewTabs from "../../$components/tabs/ReviewTabs.svelte";

    let orderItems = [], userOrders = [], loading = true;

    async function getReviewsFromUser() {
        loading = true;
        const res = await api.review.getFromUser();
        $reviewsUser = res.success ? res.reviews : [];
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

    onMount(async () => {
        if (!orderItems.length) {
            await getIdProductsFromOrders();
        }
        if (!$reviewsUser.length) {
            await getReviewsFromUser();
        }
    });

    $: if ($reviewsUser.length) {
        getIdProductsFromOrders();
    }
    $: pendingReviews = orderItems.filter(item => !$reviewsUser.find(review => review.productId === item.product_id)) || orderItems;
</script>

<style>
</style>

{#if loading || $navigating}
    <MoonLoading />
{:else}
    <HeaderTitle title={$t("review.account.title")} />
    <div class="relative border w-full bg-white mx-2 shadow-md rounded h-full">
        {#if userOrders.length}
            <ReviewTabs {pendingReviews} reviews={$reviewsUser} {orderItems} />
        {:else}
            <section class="rounded p-6 my-2 mx-auto h-24 bg-indigo-200 flex flex-col justify-center">
                <span>{$t("review.empty.text")}</span>
                <a href="/" class="underline hover:text-blue-700">{$t("review.empty.link")}</a>
            </section>
        {/if}
    </div>       
{/if}