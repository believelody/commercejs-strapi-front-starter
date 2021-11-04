<script>
	import { onMount } from 'svelte';
import ArrowLeft from '../svg/ArrowLeftIcon.svelte';
import ArrowRight from '../svg/ArrowRightIcon.svelte';
import Thumbnail from '../thumbnail/Thumbnail.svelte';

	export let images;
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
>
	<div
		slot="prev"
		class="absolute h-full z-20
				hover:bg-gray-800 hover:bg-opacity-50
				transition duration-500
				flex items-center"
		on:click={showPrevPage}
	>
		<ArrowLeft />
	</div>
	{#each images as image}
		<img
			alt={image.filename}
			class="object-contain object-center w-full h/4/5"
			src={image.url}
		/>
	{/each}
	<div
		slot="next"
		class="absolute right-0 h-full z-20
				hover:bg-gray-800 hover:bg-opacity-50
				transition duration-500
				flex items-center"
		on:click={showNextPage}
	>
		<ArrowRight />
	</div>
	<div slot="dots" class="flex w-full h-1/5">
		<Thumbnail
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
