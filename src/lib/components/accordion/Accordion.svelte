<script>
    import { slide } from 'svelte/transition';
    import ChevronDownIcon from '../svg/ChevronDownIcon.svelte';
    
    let isOpen = false;
    
    function toggle() {
        isOpen = !isOpen;
    }
</script>

<style>
    button {
        font-size: 36px;
    }

    span {
        transition: transform 0.5s;
    }
    [aria-expanded=true] span {
        transform: rotate(0.25turn);
    }

    div {
        max-height: calc(100vh - 8rem);
    }
</style>

<button on:click={toggle} aria-expanded={isOpen} class="w-full flex items-center cursor-pointer border bg-none">
    <span>
        <ChevronDownIcon />
    </span>
    <slot name="header" />
</button>

{#if isOpen}
    <div class="overflow-y-hidden" transition:slide={{ duration: 500 }}>
        <slot name="content" props />
    </div>
{/if}