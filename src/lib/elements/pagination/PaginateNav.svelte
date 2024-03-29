<script context="module">
	export function paginate({ items, pageSize, currentPage }) {
		return items.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
	}
</script>

<script>
	import { createEventDispatcher } from 'svelte';
	import generateNavigationOptions from './generateNavigationOptions';
	import { PREVIOUS_PAGE, NEXT_PAGE, ELLIPSIS } from './symbolTypes';

	const dispatch = createEventDispatcher();

	export let totalItems = 0;
	export let pageSize = 1;
	export let currentPage = 1;
	export let limit = null;
	export let showStepOptions = false;

	$: options = generateNavigationOptions({
		totalItems,
		pageSize,
		currentPage,
		limit,
		showStepOptions
	});

	$: totalPages = Math.ceil(totalItems / pageSize);

	function handleOptionClick(option) {
        let value;
        if (option.type === "symbol") {
            if (option.symbol === PREVIOUS_PAGE) {
                value = currentPage - 1;
            } else if (option.symbol === NEXT_PAGE) {
                value = currentPage + 1;
            }
        } else if (option.type === "number") {
            value = option.value;
        }
		dispatch('setPage', { page: value });
	}
</script>

<div class="pagination-nav">
	{#each options as option}
		<button
			class="option"
			disabled={(option.type === 'symbol' &&
				option.symbol === NEXT_PAGE &&
				currentPage >= totalPages) ||
				(option.type === 'symbol' && option.symbol === PREVIOUS_PAGE && currentPage <= 1)}
			class:ellipsis={option.type === 'symbol' && option.symbol === ELLIPSIS}
			class:active={option.type === 'number' && option.value === currentPage}
			on:click={() => handleOptionClick(option)}
		>
			{#if option.type === 'number'}
				<slot name="number" value={option.value}>
					<span>{option.value}</span>
				</slot>
			{:else if option.type === 'symbol' && option.symbol === ELLIPSIS}
				<slot name="ellipsis">
					<span>...</span>
				</slot>
			{:else if option.type === 'symbol' && option.symbol === PREVIOUS_PAGE}
				<slot name="prev">
					<svg style="width:24px;height:24px" viewBox="0 0 24 24">
						<path
							fill="#000000"
							d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
						/>
					</svg>
				</slot>
			{:else if option.type === 'symbol' && option.symbol === NEXT_PAGE}
				<slot name="next">
					<svg style="width:24px;height:24px" viewBox="0 0 24 24">
						<path fill="#000000" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
					</svg>
				</slot>
			{/if}
		</button>
	{/each}
</div>

<style>
    @import "../../../styles/tailwind-output.css";

	.pagination-nav {
		@apply grid grid-flow-col gap-x-4;
	}
    .option {
        @apply btn px-4 py-2 rounded;
    }
	.active {
        @apply underline bg-white border border-neutral-dark font-bold;
	}
</style>