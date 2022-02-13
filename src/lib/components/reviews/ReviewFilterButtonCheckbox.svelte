<script>
    import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n';
	import Checkbox from '../field/Checkbox.svelte';
	import Star from '../star/Star.svelte';

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
		<button on:click={() => filterReview(5)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
			<Checkbox checked={filters.some((filter) => filter === 5)} name="filters" />
			<Star nb={5} />
			<span class="ml-4"
				>{reviews.filter((review) => review.ratings === 5).length}
				{$t('product.detail.reviews')}</span
			>
		</button>
		<button on:click={() => filterReview(4)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
			<Checkbox checked={filters.some((filter) => filter === 4)} name="filters" />
			<Star nb={4} />
			<span class="ml-4"
				>{reviews.filter((review) => review.ratings === 4).length}
				{$t('product.detail.reviews')}</span
			>
		</button>
		<button on:click={() => filterReview(3)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
			<Checkbox checked={filters.some((filter) => filter === 3)} name="filters" />
			<Star nb={3} />
			<span class="ml-4"
				>{reviews.filter((review) => review.ratings === 3).length}
				{$t('product.detail.reviews')}</span
			>
		</button>
		<button on:click={() => filterReview(2)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
			<Checkbox checked={filters.some((filter) => filter === 2)} name="filters" />
			<Star nb={2} />
			<span class="ml-4"
				>{reviews.filter((review) => review.ratings === 2).length}
				{$t('product.detail.reviews')}</span
			>
		</button>
		<button on:click={() => filterReview(1)} class="w-auto p-2 hover:bg-gray-200 flex items-center">
			<Checkbox checked={filters.some((filter) => filter === 1)} name="filters" />
			<Star nb={1} />
			<span class="ml-4"
				>{reviews.filter((review) => review.ratings === 1).length}
				{$t('product.detail.reviews')}</span
			>
		</button>
		<button
			on:click={() => filterReview('images')}
			class="w-auto p-2 hover:bg-gray-200 flex items-center"
		>
			<Checkbox checked={filters.some((filter) => filter === 'images')} name="filters" />
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
