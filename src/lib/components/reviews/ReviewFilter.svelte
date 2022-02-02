<script>
    import { createEventDispatcher } from "svelte";
    import { t } from "$lib/i18n";
    import Star from "../star/Star.svelte";
    import CheckboxField from "../field/CheckboxField.svelte";
    import ReviewFilterAccordion from "../accordion/ReviewFilterAccordion.svelte";

    const INIT_VALUES = [5, 4, 3, 2, 1, "images"];
    let filters = INIT_VALUES;
    const dispatch = createEventDispatcher();

    function filterReview(value) {
        filters = filters.some(filter => filter === value) ? filters.filter(f => f !== value) : [...filters, value];        
    }

    $: dispatch("filter", { filters });
</script>

<style>
    /* your styles go here */
</style>

<!-- Desktop layout -->
<div class="hidden lg:block">
    <h3 class="py-2 text-lg font:semibold text-center">{$t("review.product.filter.header")}</h3>
    <div class="m-1 lg:m-0 border-t border-b flex flex-col lg:flex-col divide-y lg:divide-x-0 lg:divide-x">
        <button on:click={() => filterReview(5)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
            <CheckboxField
                checked={filters.some(filter => filter === 5)}
                name="filters"
            />
            <Star nb={5} />
        </button>
        <button on:click={() => filterReview(4)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
            <CheckboxField
                checked={filters.some(filter => filter === 4)}
                name="filters"
            />
            <Star nb={4} />
        </button>
        <button on:click={() => filterReview(3)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
            <CheckboxField
                checked={filters.some(filter => filter === 3)}
                name="filters"
            />
            <Star nb={3} />
        </button>
        <button on:click={() => filterReview(2)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
            <CheckboxField
                checked={filters.some(filter => filter === 2)}
                name="filters"
            />
            <Star nb={2} />
        </button>
        <button on:click={() => filterReview(1)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
            <CheckboxField
                checked={filters.some(filter => filter === 1)}
                name="filters"
            />
            <Star nb={1} />
        </button>
        <button on:click={() => filterReview("images")} class="w-auto p-2 hover:bg-gray-200 flex items-center">
            <CheckboxField
                checked={filters.some(filter => filter === "images")}
                name="filters"
            />
            {$t("review.product.filter.with-images")}
        </button>
    </div>
    <div>
        <button class="w-full flex justify-center items-center py-2" on:click={() => filters = filters.length === INIT_VALUES.length ? [] : INIT_VALUES}>
            <CheckboxField
                checked={filters.length === INIT_VALUES.length}
                name="filters"
            />
            {#if filters.length === INIT_VALUES.length}
                <span>{$t("review.product.filter.unselect-all")}</span>
            {:else}
                <span>{$t("review.product.filter.select-all")}</span>
            {/if}
        </button>
    </div>
</div>

<!-- tablet and mobile layout -->
<div class="block lg:hidden">
    <ReviewFilterAccordion />
</div>