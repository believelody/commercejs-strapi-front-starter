<script context="module">
	import { modal } from '$lib/stores';

	/**
	 *
	 * @param modalData is an object with component, props and options as properties
	 */
	export function openModal(modalData) {
		modal.set(typeof modalData === "function" ? { component: modalData } : modalData);
	}

	export function closeModal() {
		modal.set(null);
	}

	export function disableCloseModal() {
		modal.update((modalData) => {
			if (!modalData) {
				return null;
			}
			return {
				...modalData,
				options: {
					...modalData.options,
					noCloseOnEsc: true,
					noCloseOnOuterClick: true,
					noCloseButton: true
				}
			};
		});
	}

	export function resetModalCloseOptions() {
		modal.update((modalData) => {
			if (!modalData) {
				return null;
			}
			return {
				...modalData,
				options: {
					...modalData.options,
					noCloseOnEsc: false,
					noCloseOnOuterClick: false,
					noCloseButton: false
				}
			};
		});
	}
</script>

<script>
	import { fade } from 'svelte/transition';

	let fadeDuration = $modal?.options?.duration ?? 150;

	function overlayClick(e) {
		if ('close' in e.target.dataset && !$modal?.options?.noCloseOnOuterClick) $modal = null;
	}

	function onKeydown(e) {
		if (e.key === 'Escape' && !$modal?.options?.noCloseOnEsc) {
			e.preventDefault();
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={onKeydown} />

{#if $modal}
	<div
		class="focus:bg-danger fixed top-0 right-0 bottom-0 left-0 flex-center-middle overlay {
			$modal.options?.glass
			? ''
			: 'bg-black bg-opacity-50'
		}"
		data-close
		on:click={overlayClick}
		transition:fade={{ duration: fadeDuration }}
	>
		<nav class={$modal.options?.glass ? 'glass' : ''} transition:fade={{ duration: fadeDuration }}>
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
