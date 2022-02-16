<script>
	import { fade, fly } from 'svelte/transition';
	import { sidebar } from '$lib/stores';

	let width;
	function overlay_click(e) {
		if ('close' in e.target.dataset) $sidebar = null;
	}
</script>

{#if $sidebar}
	<div
            class="fixed top-0 right-0 bottom-0 left-0 flex-center-middle z-50 {$sidebar.glass ? '' : 'bg-black bg-opacity-50'}"
            data-close
            on:click={overlay_click}
            transition:fade={{ duration: 150 }}
	>
        <nav
			class="w-auto h-screen fixed top-0
			{$sidebar.openFrom || 'right'}-0
			{$sidebar.glass ? 'glass' : ''}
			bg-white border-l border-gray-300"
			bind:clientWidth={width}
			transition:fly={{ x: $sidebar.openFrom === "left" ? -width : width, opacity: 1 }}
        >
			<svelte:component this={$sidebar.component} {...$sidebar.props} />
		</nav>
	</div>
{/if}

<style>
	nav {
		z-index: 999;
	}
</style>
