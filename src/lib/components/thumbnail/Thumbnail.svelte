<script>
    import {createEventDispatcher, onMount} from 'svelte';
    import ArrowLeftCircle from '../svg/ArrowLeftCircleIcon.svelte';
    import ArrowRightCircle from '../svg/ArrowRightCircleIcon.svelte';

    export let thumbnails, productData = null, currentPageIndex = 0, infinite = false, particlesToShow = 5, height = 100, noSelectedItemBorder = false;
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
                  dots={false} {particlesToShow}
                  let:showPrevPage let:showNextPage
                  {infinite}
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
                    alt={thumbnail.filename}
                    on:click={() => dispatch("showPage", index)}
                    style="--height: {height}px"
                    class={`object-contain object-center h-full
                    cursor-pointer`}
            />
            {#if productData}
                <h4>
                    <a href={`/products/${productData[index].permalink}`} class="w-full text-center">
                        {productData[index].name}
                    </a>
                </h4>
            {/if}
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