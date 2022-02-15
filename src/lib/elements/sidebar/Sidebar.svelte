<script>
	import { fade, fly } from 'svelte/transition';
	import { sidebar } from '$lib/stores';
	import { t } from '$lib/i18n';
	import CloseIcon from '$lib/elements/icon/CloseIcon.svelte';

	let width;
	function overlay_click(e) {
		if ('close' in e.target.dataset) $sidebar = null;
	}
</script>

{#if $sidebar}
	<div
		class="modal-overlay"
		data-close
		on:click={overlay_click}
		transition:fade={{ duration: 150 }}
	>
		<nav
			class="w-auto h-screen fixed top-0 {$sidebar.openFrom ||
				'right'}-0 bg-white border-l border-gray-300"
			bind:clientWidth={width}
			transition:fly={{ x: $sidebar.openFrom === "left" ? -width : width, opacity: 1 }}
		>
			{#if !$sidebar.noCloseBtn}
				<button
					on:click={() => ($sidebar = null)}
					type="button"
					class="rm-2 mt-2 text-gray-400 right-0 hover:text-gray-500 absolute"
				>
					<span class="sr-only">{$t('modal.close')}</span>
					<!-- Heroicon name: outline/x -->
					<CloseIcon />
				</button>
			{/if}
			<svelte:component this={$sidebar.component ?? $sidebar} {...$sidebar.props} />
		</nav>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	nav {
		z-index: 999;
	}

	button {
		z-index: 999;
	}
</style>
