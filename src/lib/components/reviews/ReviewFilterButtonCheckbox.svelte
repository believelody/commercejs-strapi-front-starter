<script>
    import {createEventDispatcher} from 'svelte';
    import {t} from '$lib/i18n';
    import CheckboxInput from '../../elements/input/CheckboxInput.svelte';
    import Star from '../../elements/star/Star.svelte';

    export let reviews;
    const INIT_VALUES = [5, 4, 3, 2, 1, 'images'];
    const score = reviews.length ? (reviews.reduce((acc, cur) => acc + cur.ratings, 0) / reviews.length) : 0;
    let filters = INIT_VALUES;
    const dispatch = createEventDispatcher();

    function filterReview(value) {
        filters = filters.some((filter) => filter === value)
            ? filters.filter((f) => f !== value)
			: [...filters, value];
	}

	$: dispatch('filter', { filters });
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-0 divide-y md:divide-x lg:divide-y">
	<section class="flex flex-col lg:flex-reverse items-center justify-center pb-2">
        <h4 class="py-2 text-md font:semibold text-center">{$t("review.product.filter.rating.label")}</h4>
        <div>
            <span class="text-3xl">{score}</span>
            <span class="text-lg">/5 {$t("product.detail.reviews")}</span>
        </div>
        <Star nb={score} />
    </section>
	<section>
		{#each Array.from({ length: 5 }, (v, i) => i + 1) as i}
			<button on:click={() => filterReview(i)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
				<CheckboxInput checked={filters.some((filter) => filter === i)} name="filters" />
				<Star nb={i} />
				<span class="ml-4">
					{reviews.filter((review) => review.ratings === i).length}
					{$t('product.detail.reviews')}
				</span>
			</button>
		{/each}
		<button
			on:click={() => filterReview('images')}
			class="w-auto p-2 hover:bg-gray-200 flex items-center"
		>
			<CheckboxInput checked={filters.some((filter) => filter === 'images')} name="filters" />
			{$t('review.product.filter.with-images')}
			<span class="ml-4"
				>{reviews.filter((review) => review.images.length).length}
				{$t('product.detail.reviews')}</span
			>
		</button>
        <hr>
		<button
			class="w-full flex justify-center items-center py-2"
			on:click={() => (filters = filters.length === INIT_VALUES.length ? [] : INIT_VALUES)}
		>
			{#if filters.length === INIT_VALUES.length}
				<span>{$t('review.product.filter.unselect-all')}</span>
			{:else}
				<span>{$t('review.product.filter.select-all')}</span>
			{/if}
		</button>
	</section>
</div>

<style>
	/* your styles go here */
</style>
