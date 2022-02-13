<script>
    import {createEventDispatcher, onMount} from 'svelte';
    import { tap } from "@sveltejs/gestures";
    import ArrowLeftCircle from '../../elements/icon/ArrowLeftCircleIcon.svelte';
    import ArrowRightCircle from '../../elements/icon/ArrowRightCircleIcon.svelte';

    export let thumbnails, currentPageIndex = 0, infinite = false, particlesToShow = 5, particlesToScroll = 1, height = 100, noSelectedItemBorder = false;
    let Carousel; // for saving Carousel component class
    let carousel; // for calling methods of the carousel instance
    onMount(async () => {
        const module = await import('svelte-carousel');
        Carousel = module.default;
    });

    const dispatch = createEventDispatcher();

    $: {
        if (carousel) {
            carousel.goTo(currentPageIndex);
        }
    }
</script>

<svelte:component this={Carousel} bind:this={carousel}
                  dots={false} {particlesToShow}
                  let:showPrevPage let:showNextPage
                  {infinite} {particlesToScroll}
                  initialPageIndex={currentPageIndex}
>
    <div
        slot="prev"
        class="absolute h-full z-20
            flex items-center"
        on:click={showPrevPage}
    >
        <ArrowLeftCircle/>
    </div>
    {#each thumbnails as thumbnail, index (index)}
        <div class="flex flex-col items-center {currentPageIndex === index && !noSelectedItemBorder ? 'border-2 border-gray-800' : ''}">
            <img
                src={thumbnail.url}
                alt={thumbnail.filename || thumbnail.name}                
                style="--height: {height}px"
                on:click={() => dispatch("showPage", index)}
                use:tap
                on:tap={() => dispatch("showPage", index)}
                class={`object-contain object-center h-full
                cursor-pointer`}
            />
            <slot name="extra" {index} />
        </div>
    {/each}
    <div
        slot="next"
        class="absolute right-0 h-full z-20
            flex items-center"
        on:click={showNextPage}
    >
        <ArrowRightCircle/>
    </div>
</svelte:component>

<style>
    img {
        max-height: var(--height);
    }
</style>