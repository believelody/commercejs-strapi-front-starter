<script context="module">
	import { sidebar } from '$lib/stores';
import { transition_in } from 'svelte/internal';

	/**
	 *
	 * @param sidebarData is an object with component, props and options as properties
	 */
	export function openSidebar({ component, props = null, options = null }) {
		sidebar.set({ component, props, options });
	}

	export function closeSidebar() {
		sidebar.set(null);
	}
</script>

<script>
	import { fade, fly } from 'svelte/transition';

	let width, height;
	function overlay_click(e) {
		if ('close' in e.target.dataset) $sidebar = null;
	}

	function originPosition() {
		let transitionOptions = { opacity: 1, duration: 750 }
		switch ($sidebar?.options?.openFrom) {
			case 'left':
				transitionOptions.x = -width;
				break;
			case 'top':
				transitionOptions.y = -height;
				break;
			case 'bottom':
				transitionOptions.y = height;
				break;
			case 'right':		
			default:
				transitionOptions.x = width;
				break;
		}
		return transitionOptions;
	}

</script>

{#if $sidebar}
	<div
		class="fixed top-0 right-0 bottom-0 left-0 flex-center-middle z-50 {$sidebar.options?.glass
			? ''
			: 'bg-black bg-opacity-50'}"
		data-close
		on:click={overlay_click}
		transition:fade={{ duration: 150 }}
	>
		<nav
			class="{$sidebar?.options?.height ?? 'h-screen'} fixed
			{$sidebar.options?.openFrom === 'left' ? 'left' : 'right'}-0
			{$sidebar.options?.openFrom === 'bottom' ? 'bottom' : 'top'}-0
			{$sidebar.options?.glass ? 'glass' : ''}"
			bind:clientWidth={width}
			bind:clientHeight={height}
			transition:fly={{ ...originPosition() }}
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
