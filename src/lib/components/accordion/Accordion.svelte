<script>
    import { slide } from 'svelte/transition';
    import ChevronDownIcon from '../svg/ChevronDownIcon.svelte';
    
    export let isOpen = false, headerTextSize = "xl", noContentBorderTop = false;
    let duration = 300;
    
    function toggle() {
        isOpen = !isOpen;
    }
</script>

<style>
</style>

<div class="{$$props.class}">
    <button on:click={toggle} aria-expanded={isOpen} class="w-full flex items-center cursor-pointer py-2 bg-none">
        <div class="transition duration-{duration} ease-in rotate-{isOpen ? 90 : 0} transform-gpu">
            <ChevronDownIcon />
        </div>
        <h3 class="text-{headerTextSize} text-left w-full pr-4">
            <slot name="header" />
        </h3>
    </button>

    {#if isOpen}
        <div class={!noContentBorderTop ? "border-t-2 p-2" : ""} transition:slide={{ duration }}>
            <slot name="content" />
        </div>
    {/if}
</div>