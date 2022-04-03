<script>
	import { page } from '$app/stores';
	import { t } from '$lib/i18n';
	import Star from '$elements/star/Star.svelte';
	import { fullName } from '$utils/user.util';
	import { localDateFromString } from '$utils/date.util';
	import Card from '$elements/card/Card.svelte';
	import ReviewImageViewerModal from '../modals/ReviewImageViewerModal.svelte';
	import { fullOpacityBackground } from '$lib/utils/modal.util';
	import PaginateComponent from '$elements/pagination/PaginateComponent.svelte';
	import { modal } from '$lib/elements/modal/Modal.svelte';

	export let reviews;

	function showModal(index, review) {
		modal.open(
			{
				component: ReviewImageViewerModal,
				props: { images: review.images, selectedIndex: index }
			},
			{ ...fullOpacityBackground }
		);
	}
</script>

<div class="flex flex-col justify-between h-full">
	<PaginateComponent
		let:paginatedItems
		items={reviews}
		url={$page.url.href}
		currentPage={+$page.url.searchParams.get('page') || 1}
	>
		<ul class="w-full grid grid-cols-1 gap-y-4 grow">
			{#each paginatedItems as review}
				<li>
					<Card class="bg-neutral-100 border">
						<h3
							slot="header"
							class="flex items-center justify-between p-2 border-b border-neutral-300"
						>
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
							class="flex flex-wrap justify-start py-2 border-t border-neutral-300"
						>
							{#each review.images as image, index}
								<li class="flex flex-col m-1">
									<img
										class="object-cover w-24 h-24 cursor-pointer"
										src={`${image.url}`}
										alt={image.name}
										on:click={() => showModal(index, review)}
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
	</PaginateComponent>
</div>
