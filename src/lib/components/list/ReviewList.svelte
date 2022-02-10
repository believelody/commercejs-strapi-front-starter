<script>
	import { getContext } from 'svelte';
	import { paginate, PaginationNav } from 'svelte-paginate';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n';
	import Star from '../star/Star.svelte';
	import { fullName } from '../../utils/user.util';
	import { localDateFromString } from '../../utils/date.util';
	import Card from '../card/Card.svelte';
	import { openReviewViewerModal } from '../../context/review';

	export let reviews,
		currentPage = +$page.query.get('page') || 1,
		pageSize = 6;
	const { open } = getContext('simple-modal');

	function goToPage({ detail }) {
		currentPage = detail.page;
		goto(`reviews?page=${detail.page}`);
	}

	$: paginatedReviews = reviews.length ? paginate({ items: reviews, pageSize, currentPage }) : [];
</script>

<div class="flex flex-col justify-between h-full">
	<ul class="w-full grid grid-cols-1 gap-y-4 flex-grow">
		{#each paginatedReviews as review}
			<li>
				<Card class="bg-gray-100 border">
					<h3 slot="header" class="flex items-center justify-between p-2 border-b border-gray-300">
						<div class="flex items-center">
							<span class="mr-8 text-lg font-medium">{fullName(review.user.customer)}</span>
							<Star nb={review.ratings} />
						</div>
						<div>
							<span>{localDateFromString(review.created_at)}</span>
						</div>
					</h3>
					<p slot="content" class="p-2 italic">&lt;&lt; {review.description} &gt;&gt;</p>
					<ul
						slot="extra"
						class:hidden={!review.images.length}
						class="flex flex-wrap justify-start py-2 border-t border-gray-300"
					>
						{#each review.images as image, index}
							<li class="flex flex-col m-1">
								<img
									class="object-cover w-24 h-24 cursor-pointer"
									src={`${image.url}`}
									alt={image.name}
									on:click={() => openReviewViewerModal(open, index, review)}
								/>
							</li>
						{/each}
					</ul>
				</Card>
			</li>
		{:else}
			<section>{$t('review.product.list.empty')}</section>
		{/each}
	</ul>
	{#if reviews.length}
		<section class="relative bottom-0 w-full flex justify-center mt-8">
			<PaginationNav
				totalItems={reviews.length}
				{pageSize}
				{currentPage}
				limit={1}
				showStepOptions
				on:setPage={goToPage}
			/>
		</section>
	{/if}
</div>

<style>
	:global(.pagination-nav) {
		display: flex;
		justify-content: space-between;
	}
	:global(.number) {
		margin: 0 8px;
		cursor: pointer;
	}
	:global(.prev),
	:global(.next) {
		cursor: pointer;
	}
	:global(.active) {
		text-decoration: underline;
		font-weight: bold;
	}
</style>
