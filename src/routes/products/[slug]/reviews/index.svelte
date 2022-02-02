<script context="module">
    import api from '$lib/api';

    export async function load({ page }) {
        const { slug } = page.params;            
        const productRes = await api.product.getBySlug(slug);
        if (productRes.error) {
            return {
                props: { error: productRes.error }
            }
        }
        const res = await api.review.getFromProductId(productRes.product.id);
        if (res.error) {
            return {
                props: { error: res.error }
            }
        }
        return {
            props: { reviews: res.reviews, product: productRes.product }
        }
    }
</script>

<script>
    import { t } from "$lib/i18n";
    import ReviewList from '../../../../lib/components/reviews/ReviewList.svelte';
    import ReviewFilter from '../../../../lib/components/reviews/ReviewFilter.svelte';
    import HeaderTitle from "../../../../lib/components/header/HeaderTitle.svelte";

    export let reviews, product, error;
    let filteredReviews = reviews || [];

    function filterReviews({ detail }) {
        filteredReviews = detail.filters.length ? reviews.filter(review => detail.filters.some(f => {
            if (f === "images") {
                return review["images"].length;
            }
            return review.ratings === f;
        })) : reviews;
    }
</script>

<HeaderTitle title={$t("review.product.header", { name: product.name })} />
<div class="container mx-auto flex flex-col items-start lg:flex-row lg:justify-between">
    <aside class="sticky top-0 bg-gray-100 lg:ml-4 w-full lg:w-1/4 shadow-md border rounded">
        <ReviewFilter reviews={filteredReviews} on:filter={ filterReviews } />
    </aside>
    <article class="relative mt-2 lg:mt-0 lg:mx-4 w-full lg:w-3/4 rounded">
        <ReviewList reviews={filteredReviews} />
    </article>
</div>