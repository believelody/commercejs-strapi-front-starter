<script>
	import { onMount } from 'svelte';
	import ArrowLeft from '$elements/icon/ArrowLeftIcon.svelte';
	import ArrowRight from '$elements/icon/ArrowRightIcon.svelte';
	import Thumbnails from '$elements/thumbnail/Thumbnails.svelte';

	export let images, selectedIndex = 0;
	let Carousel; // for saving Carousel component class
	let carousel; // for calling methods of the carousel instance
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});
</script>

<svelte:component
	this={Carousel} 
	bind:this={carousel}
	let:currentPageIndex
	let:showPage
	let:showPrevPage
	let:showNextPage
	initialPageIndex={selectedIndex}
>
	<div
		slot="prev"
		class="absolute z-20 flex items-center h-full transition duration-500 hover:bg-gray-800 hover:bg-opacity-50"
		on:click={showPrevPage}
	>
		<ArrowLeft />
	</div>
	{#each images as image}
		<img
			alt={image.filename}
			class="object-contain object-center w-full h-4/5"
			src={image.url}
		/>
	{/each}
	<div
		slot="next"
		class="absolute right-0 z-20 flex items-center h-full transition duration-500 hover:bg-gray-800 hover:bg-opacity-50"
		on:click={showNextPage}
	>
		<ArrowRight />
	</div>
	<div slot="dots" class="flex w-full h-1/5">
		<Thumbnails
			thumbnails={images}
			{currentPageIndex}
			on:showPage={({ detail }) => showPage(detail)}
		/>
	</div>
</svelte:component>

<style>
	img {
		max-height: 500px !important;
	}
</style>
