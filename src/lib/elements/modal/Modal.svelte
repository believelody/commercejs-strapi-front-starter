<script context="module">
	import { modal } from '$lib/stores';

	/**
	 * 
	 * @param modalData is an object with component, props and options as properties
	 */
	export function openModal(modalData) {
		modal.set(modalData);
	}

	export function closeModal() {
		modal.set(null);
	}
</script>

<script>
	import { fade } from 'svelte/transition';

	let fadeDuration = $modal?.options?.duration ?? 150;

	function overlayClick(e) {
		if ('close' in e.target.dataset && !$modal?.options?.closeOnOuterClick) $modal = null;
	}

	function onKeydown(e) {
		if (e.key === "Escape" && !$modal.options.closeOnEsc) {
			closeModal();
		}
	}
</script>

{#if $modal}
	<div
        class="fixed top-0 right-0 bottom-0 left-0 flex-center-middle overlay {$modal.options?.glass ? '' : 'bg-black bg-opacity-50'}"
        data-close
        on:click={overlayClick}
		on:keydown={onKeydown}
        transition:fade={{ duration: fadeDuration }}
	>
        <nav
			class="{$modal.options?.glass ? 'glass' : ''}"
            transition:fade={{ duration: fadeDuration }}
        >
			<svelte:component this={$modal.component} {...$modal.props} />
		</nav>
	</div>
{/if}

<style>
    .overlay {
        z-index: 9999;
    }
	nav {
		z-index: 9999;
	}
</style>
