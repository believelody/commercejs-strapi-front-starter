<script context="module">
    import api from '$api';
    import { reviewsProduct } from "$lib/stores";

    export async function load({ params }) {
        const { slug } = params;
        const storedReviews = get(reviewsProduct);
        const productRes = await api.product.getBySlug(slug);
        if (productRes.error) {
            return {
                props: { error: productRes.error }
            }
        }

        if (!storedReviews.length) {
            const res = await api.review.getFromProductId(productRes.product.id);
            if (res.error) {
                return {
                    props: { error: res.error }
                }
            }
        }
        return {
            props: { product: productRes.product }
        }
    }
</script>

<script>
    import { get } from 'svelte/store';
    import { t } from "$lib/i18n";
    import ReviewList from '../../../../lib/components/list/ReviewList.svelte';
    import ReviewFilter from '../../../../lib/components/reviews/ReviewFilter.svelte';
    import HeaderTitle from "../../../../lib/components/header/HeaderTitle.svelte";

    export let product, error;
    let filteredReviews = $reviewsProduct || [];

    function filterReviews({ detail }) {
        filteredReviews = detail.filters.length ? $reviewsProduct.filter(review => detail.filters.some(f => {
            if (f === "images") {
                return review["images"].length;
            }
            return review.ratings === f;
        })) : $reviewsProduct;
    }
</script>

<HeaderTitle title={$t("review.product.header", { name: product.name })} />
<div class="relative container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
    <aside class="lg:sticky lg:col-span-1 top-0">
        <ReviewFilter reviews={$reviewsProduct} on:filter={ filterReviews } />
    </aside>
    <article class="relative lg:col-span-2">
        <ReviewList reviews={filteredReviews} />
    </article>
</div>