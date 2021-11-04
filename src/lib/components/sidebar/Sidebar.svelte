<script>
	import { fade, fly } from 'svelte/transition';
	import { sidebar } from '$lib/stores';

	let width;
	function overlay_click(e) {
		if ('close' in e.target.dataset) $sidebar = false;
	}
</script>

{#if $sidebar}
	<div
		class="modal-overlay"
		data-close
		on:click={overlay_click}
		transition:fade={{ duration: 150 }}
	>
		<nav bind:clientWidth={width} transition:fly={{ x: width, opacity: 1 }}>
			<svelte:component this={$sidebar} />
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
		z-index: 10;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	nav {
		z-index: 999;
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		/* padding: 2rem 1rem 0.6rem; */
		border-left: 1px solid #aaa;
		background: #fff;
		width: auto;
	}
</style>
