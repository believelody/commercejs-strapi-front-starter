<script>
    import { slide } from 'svelte/transition';
    import ChevronDownIcon from '$lib/elements/icon/ChevronDownIcon.svelte';
    
    export let isOpen = false, iconSize = 8, iconColor, noContentBorderTop = false;
    let duration = 750;
    
    function toggle() {
        isOpen = !isOpen;
    }
</script>

<div class="{$$props.class}">
    <button on:click={toggle} aria-expanded={isOpen} class="w-full flex items-center cursor-pointer py-2 bg-none">
        <div class="transition-transform duration-{duration} ease-in rotate-{isOpen ? 90 : 0} transform-gpu">
            <ChevronDownIcon size={iconSize} color={iconColor} />
        </div>
        <div class="w-full pr-4">
            <slot name="header" />
        </div>
    </button>

    {#if isOpen}
        <div class={!noContentBorderTop ? "border-t-2" : ""} transition:slide={{ duration }}>
            <slot name="content" />
        </div>
    {/if}
</div>