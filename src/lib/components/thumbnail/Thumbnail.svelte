<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import ArrowLeftCircle from '../svg/ArrowLeftCircleIcon.svelte';
	import ArrowRightCircle from '../svg/ArrowRightCircleIcon.svelte';
    
	export let thumbnails, currentPageIndex;
    const MAX = 5;
    let Carous; // for saving Carousel component class
	let carous; // for calling methods of the carousel instance
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carous = module.default;
	});

    const dispatch = createEventDispatcher();

    $: {
        if (carous) {
            carous.goTo(currentPageIndex);
        }
    }
</script>

<svelte:component this={Carous} bind:this={carous}
    dots={false} particlesToShow={MAX}
    let:showPrevPage let:showNextPage
	infinite={false}
>
	<div
		slot="prev"
		class="absolute h-full z-20
                flex items-center"
		on:click={showPrevPage}
	>
		<ArrowLeftCircle />
	</div>
	{#each thumbnails as thumbnail, index (index)}
		<img
			src={thumbnail.url}
			alt={thumbnail.filename}
			on:click={() => dispatch("showPage", index)}
			class={`object-contain object-center
                    cursor-pointer
                    ${currentPageIndex === index ? "border-2 border-gray-800" : ""}
            `}
		/>
	{/each}
	<div
		slot="next"
		class="absolute right-0 h-full z-20
                flex items-center"
		on:click={showNextPage}
	>
		<ArrowRightCircle />
	</div>
</svelte:component>

<style>
	img {
		max-height: 100px;
	}
</style>