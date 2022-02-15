<script>
    import {t} from "$lib/i18n";
    import ReviewFilterAccordion from "../accordions/ReviewFilterAccordion.svelte";
    import Card from "../../elements/card/Card.svelte";
    import ReviewFilterButtonCheckbox from "./ReviewFilterButtonCheckbox.svelte";

    export let reviews;
</script>

<style>
    /* your styles go here */
</style>

<!-- Desktop layout -->
<Card class="bg-gray-100 border hidden lg:block">
    <h3 slot="header" class="py-2 text-lg font:semibold text-center">{$t("review.product.filter.header")}</h3>
    <div slot="content" class="m-1 lg:m-0 border-t border-b flex flex-col lg:flex-col divide-y lg:divide-x-0 lg:divide-x">
        <ReviewFilterButtonCheckbox {reviews} on:filter />
    </div>
</Card>

<!-- tablet and mobile layout -->
<div class="block lg:hidden">
    <ReviewFilterAccordion {reviews} on:filter />
</div>