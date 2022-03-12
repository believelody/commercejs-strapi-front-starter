<script>
	import { onDestroy } from 'svelte';
	import { sidebar } from '$lib/stores';
	import CloseButton from '$components/buttons/CloseButton.svelte';
	import { closeSidebar } from './Sidebar.svelte';

	export let transparent = false;
	let className;
	export { className as class };

	onDestroy(() => {
		closeSidebar();
	});
</script>

<div
	class="w-screen md:max-w-lg h-full bg-{transparent
		? 'transparent'
		: 'white'} flex flex-col relative {className}"
>
	{#if !$sidebar?.noCloseButton && !$$slots.header}
		<CloseButton on:click={closeSidebar} class="position-absolute" />
	{/if}
	<div class="relative">
        <slot name="header" />
		{#if !$sidebar?.noCloseButton && $$slots.header}
        <div class="position-header border">
            <CloseButton class="bg-transparent" on:click={closeSidebar} />
        </div>
		{/if}
	</div>
	<slot name="content" />
	<slot name="extra" />
</div>

<style>
    @import "../../../styles/tailwind-output.css";
    
	.position-absolute {
        @apply absolute top-0 right-0;
	}

	.position-header {
        @apply absolute right-0 top-1/2 transform -translate-y-1/2;
	}
</style>
