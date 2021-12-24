<script>
    import { slide } from 'svelte/transition';
    import ChevronDownIcon from '../svg/ChevronDownIcon.svelte';
    
    export let isOpen = false;
    let duration = 300;
    
    function toggle() {
        isOpen = !isOpen;
    }
</script>

<style>
</style>

<div class="border-2 border-gray-300 w-full py-2">
    <button on:click={toggle} aria-expanded={isOpen} class="w-full flex items-center cursor-pointer mb-{isOpen ? 2 : 0} bg-none">
        <ChevronDownIcon {isOpen} {duration} />
        <slot name="header" />
    </button>

    {#if isOpen}
        <div transition:slide={{ duration }}>
            <slot name="content" />
        </div>
    {/if}
</div>