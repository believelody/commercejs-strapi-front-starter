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
        console.log(res);
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

    $: console.log(filteredReviews);
</script>

<HeaderTitle title={$t("review.product.header", { name: product.name })} />
<div class="bg-indigo-300 py-4 h-full flex flex-col lg:flex-row flex-grow border-t">
    <section class="bg-white ml-4 w-1/4 rounded">
        <ReviewFilter reviews={filteredReviews} on:filter={ filterReviews } />
    </section>
    <section class="bg-white mx-4 w-3/4 rounded">
        <ReviewList reviews={filteredReviews} />
    </section>
</div>