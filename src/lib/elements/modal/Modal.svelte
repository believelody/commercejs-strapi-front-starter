<script context="module">
	import { derived, writable } from 'svelte/store';
	import { id } from '$lib/utils/helper.util';

	function createModalStore() {
		const INITIAL_STATE = {
			items: [],
			options: {}
		};
		const _modal = writable(INITIAL_STATE);

		/**
		 *
		 * @param modalData is an object with component, props and options as properties
		 */
		function open(modalData, options = null) {
			const data = typeof modalData === 'function' ? { component: modalData } : modalData;
			_modal.update((state) => {
				return {
					...state,
					items: [
						...state.items,
						{
							id: id(),
							...data
						}
					],
					options: options ?? state.options
				};
			});
		}

		function close(modalId, options) {
			_modal.update((state) => {
				return {
					...state,
					items: state.items.filter((modal) => modal.id !== modalId),
					options: options ?? state.options
				};
			});
		}

		function disableCloseModal() {
			_modal.update((state) => {
				const isModalEmpty = !state.items.length;
				console.log('disableCloseModal: ', isModalEmpty);
				if (isModalEmpty) {
					return state;
				}
				return {
					...state,
					options: {
						...state.options,
						noCloseOnEsc: true,
						noCloseOnOuterClick: true,
						noCloseButton: true
					}
				};
			});
		}

		function resetModalCloseOptions() {
			_modal.update((state) => {
				const isModalEmpty = !!state.items.length;
				console.log('resetModalCloseOptions: ', isModalEmpty);
				if (isModalEmpty) {
					return state;
				}
				return {
					...state,
					options: {
						...state.options,
						noCloseOnEsc: false,
						noCloseOnOuterClick: false,
						noCloseButton: false
					}
				};
			});
		}

		function closeAll() {
			console.log('close all');
			_modal.set(INITIAL_STATE);
		}

		const derivedModal = derived(_modal, ($_modal, set) => {
			set($_modal);
		});

		const { subscribe } = derivedModal;

		return {
			subscribe,
			open,
			close,
			closeAll,
			disableCloseModal,
			resetModalCloseOptions
		};
	}

	export const modal = createModalStore();
</script>

<script>
	import { fade } from 'svelte/transition';

	let fadeDuration = $modal.options.duration ?? 150;

	function overlayClick(e) {
		if ('close' in e.target.dataset && !$modal.options.noCloseOnOuterClick) {
			modal.closeAll();
		}
	}

	function onKeydown(e) {
		if (e.key === 'Escape' && !$modal.options.noCloseOnEsc) {
			e.preventDefault();
			modal.closeAll();
		}
	}
</script>

<svelte:window on:keydown={onKeydown} />

{#if $modal.items.length}
	<div
		class="
			focus:bg-danger fixed top-0 right-0 bottom-0 left-0 flex-center-middle overlay
			{$modal.options?.glass ? '' : 'bg-black bg-opacity-50'}
		"
		data-close
		on:click={overlayClick}
		transition:fade={{ duration: fadeDuration }}
	>
		{#each $modal.items as modal}
			<nav class={modal.options?.glass ? 'glass' : ''} transition:fade={{ duration: fadeDuration }}>
				<svelte:component this={modal.component} {...modal.props} modalId={modal.id} />
			</nav>
		{/each}
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
