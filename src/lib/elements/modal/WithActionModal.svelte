<script>
	import { t } from '$lib/i18n';
	import LinkButton from '../button/LinkButton.svelte';
	import { closeModal } from './Modal.svelte';
	import ModalWrapper from './ModalWrapper.svelte';

	export let cancelText = $t('modal.cancel.text'),
		status,
		iconBgShade;

	function applyStatusStyle() {
		let bgColor = 'bg-transparent';
		if (status) {
			bgColor = `bg-${status}`;
			if (iconBgShade === 'light') {
				bgColor += '-light-1';
			} else if (iconBgShade === 'dark') {
				bgColor += '-dark-1';
			}
		}
		return bgColor;
	}
</script>

<ModalWrapper>
	<h3
		class="flex items-center text-lg leading-6 font-medium text-gray-900"
		id="modal-title"
	>
		{#if $$slots.icon}
			<div
				class="mr-4 flex-shrink-0 flex-center-middle h-10 w-10 rounded-full {applyStatusStyle()}"
			>
				<slot name="icon" />
			</div>
		{/if}
		<slot name="header" />
	</h3>
	<div class="mt-4 flex-grow">
		<slot name="content" />
	</div>
	<div class="px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-2">
		<slot name="action" />
		{#if $$slots.cancel}
			<slot name="cancel" />
		{:else}
			<LinkButton on:click={closeModal} class="w-full border md:order-first">
				{cancelText}
			</LinkButton>
		{/if}
	</div>
</ModalWrapper>

<style>
	/* your styles go here */
</style>
