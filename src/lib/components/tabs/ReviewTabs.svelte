<script>
    import { getContext } from 'svelte';
	import { Tab, TabList, TabPanel, Tabs } from 'svelte-tabs';
	import { goto } from "$app/navigation";
    import api from "$lib/api";
    import { t } from "$lib/i18n";
    import Star from '../star/Star.svelte';
	import AddReviewModal from "../modal/AddReviewModal.svelte";
    import { localDateFromString } from '../../utils/date.util';
    import { baseUrl } from '../../utils/url.util';

    export let pendingReviews, reviews, orderItems;
	let loading = false;
    const { open } = getContext("simple-modal");

    async function goToProductPage(productId) {
        loading = true;
        const res = await api.product.getSlug(productId);
        if (res.success) {
            goto(`/products/${res.slug}`);
        }
        loading = false;
    }

    function openReviewModal(item) {
        open(AddReviewModal, { item });
    }

    $: extractProductInfo = (productId) => orderItems.find((item) => item.product_id === productId);
</script>

<Tabs>
	<TabList>
		<Tab>
			<span>{$t('review.tabs.pending')}</span>
			{#if pendingReviews.length}
				<span class="ml-4 bg-gray-500 text-white px-2 py-1 rounded-full">{pendingReviews.length}</span>
			{/if}
		</Tab>
		<Tab>
			<span>{$t('review.tabs.done')}</span>
			{#if reviews.length}
				<span class="ml-4 bg-gray-500 text-white px-2 py-1 rounded-full">{reviews.length}</span>
			{/if}
		</Tab>
	</TabList>

	<TabPanel>
		<ul>
			{#each pendingReviews as item}
				<li class="w-full border flex items-center px-4">
					<section class="w-1/2 flex flex-col">
						<span class="text-lg text-gray-800">{item.product_name}</span>
						{#each item.variants as variant}
							<span class="text-sm text-gray-600"
								>{variant.variant_name} : {variant.option_name}</span
							>
						{/each}
					</section>
					<section class="w-1/2">
						<button
							on:click={() => openReviewModal(item)}
							class="w-full py-2 px-auto text-indigo-700 border border-indigo-500 rounded hover:text-white hover:bg-indigo-500 hover:border-none"
						>
							{$t('review.button.add')}
						</button>
					</section>
				</li>
			{:else}
				<section class="rounded mt-6 flex justify-center">
					<span>{$t('review.pending.text')}</span>
				</section>
			{/each}
		</ul>
	</TabPanel>
	<TabPanel>
		<ul>
			{#each reviews as review}
				<li class="w-full flex flex-col border py-2">
					<div class="w-full flex items-stretch px-4">
						<section class="flex flex-col  w-full">
							<div class="flex justify-between">
								<div class="flex items-center text-lg text-gray-800">
									<button
										on:click={() => goToProductPage(review.productId)}
										class="mr-4 border-none font-medium underline"
										>{extractProductInfo(review.productId).name}</button
									>
									<Star nb={review.ratings} />
								</div>
								<div class="text-lg italic text-gray-500">
									{localDateFromString(review.created_at)}
								</div>
							</div>
							{#each extractProductInfo(review.productId).variants as variant}
								<div class="text-sm text-gray-600">
									{variant.variant_name} : {variant.option_name}
								</div>
							{/each}
						</section>
					</div>
					{#if review.description}
						<div class="px-4">
							<h4 class="text-md font-medium mr-2">{$t('review.list.description')} :</h4>
							<p class="pl-4 border-l-2 border-gray-400">{review.description}</p>
						</div>
					{/if}
					{#if review.images.length}
						<div class="mt-2 flex flex-col px-4 w-full">
							<h4 class="text-md font-medium">{$t('review.list.images')} :</h4>
							<ul class="flex flex-wrap">
								{#each review.images as image}
									<li class="flex flex-col">
										<img
											class="w-24 h-24 object-cover"
											src={`${image.url}`}
											alt={image.name}
										/>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</li>
			{:else}
				<section class="rounded mt-6 flex justify-center">
					<span>{$t('review.empty.text')}</span>
				</section>
			{/each}
		</ul>
	</TabPanel>
</Tabs>

<style>	
    :global(.svelte-tabs) {
        width: 100%;
    }
    :global(.svelte-tabs .svelte-tabs__tab-list) {
        display: flex;
        box-sizing: border-box;
    }
    :global(.svelte-tabs li.svelte-tabs__tab) {
        flex: 1 0 0;
    }
    :global(.svelte-tabs li.svelte-tabs__selected) {
		border-bottom: 2px solid #4338ca;
        color: #4338ca;
    }
</style>
