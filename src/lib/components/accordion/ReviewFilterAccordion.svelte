<script>
    import { createEventDispatcher } from "svelte";
    import { t } from "$lib/i18n";
    import Star from "../star/Star.svelte";
    import CheckboxField from "../field/CheckboxField.svelte";
    import Accordion from "./Accordion.svelte";

    let initialValues = [5, 4, 3, 2, 1, "images"], filters = initialValues;
    const dispatch = createEventDispatcher();

    function filterReview(value) {
        filters = filters.some(filter => filter === value) ? filters.filter(f => f !== value) : [...filters, value];
    }

    $: dispatch("filter", { filters });
</script>

<style>
    /* your styles go here */
</style>

<Accordion>
    <h3 slot="header" class="py-2 text-lg font:semibold text-center">{$t("review.product.filter.header")}</h3>
    <div slot="content" class="w-full m-1 border flex flex-col lg:flex-col rounded shadow-md divide-y lg:divide-x-0 lg:divide-x">
        <button on:click={() => filterReview(5)} class="p-2 rounded hover:bg-gray-200 flex items-center">
            <CheckboxField
                    checked={filters.some(filter => filter === 5)}
                    name="filters"
            />
            <Star nb={5} />
        </button>
        <button on:click={() => filterReview(4)} class="p-2 rounded hover:bg-gray-200 flex items-center">
            <CheckboxField
                    checked={filters.some(filter => filter === 4)}
                    name="filters"
            />
            <Star nb={4} />
        </button>
        <button on:click={() => filterReview(3)} class="p-2 rounded hover:bg-gray-200 flex items-center">
            <CheckboxField
                    checked={filters.some(filter => filter === 3)}
                    name="filters"
            />
            <Star nb={3} />
        </button>
        <button on:click={() => filterReview(2)} class="p-2 rounded hover:bg-gray-200 flex items-center">
            <CheckboxField
                    checked={filters.some(filter => filter === 2)}
                    name="filters"
            />
            <Star nb={2} />
        </button>
        <button on:click={() => filterReview(1)} class="p-2 rounded hover:bg-gray-200 flex items-center">
            <CheckboxField
                    checked={filters.some(filter => filter === 1)}
                    name="filters"
            />
            <Star nb={1} />
        </button>
        <button on:click={() => filterReview("images")} class="p-2 rounded hover:bg-gray-200 flex items-center">
            <CheckboxField
                    checked={filters.some(filter => filter === "images")}
                    name="filters"
            />
            {$t("review.product.filter.with-images")}
        </button>
    </div>
    <div>
        <button class="w-full flex justify-center items-center py-2" on:click={() => filters = filters.length === initialValues.length ? [] : initialValues}>
            <CheckboxField
                    checked={filters.length === initialValues.length}
                    name="filters"
            />
            {#if filters.length === initialValues.length}
                <span>{$t("review.product.filter.unselect-all")}</span>
            {:else}
                <span>{$t("review.product.filter.select-all")}</span>
            {/if}
        </button>
    </div>
</Accordion>