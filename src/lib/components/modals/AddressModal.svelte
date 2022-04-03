<script>
	import { t } from '$lib/i18n';
	import AddressForm from '../forms/AddressForm.svelte';
	import ModalWrapper from '$elements/modal/ModalWrapper.svelte';
	import { modal } from '$lib/elements/modal/Modal.svelte';

	export let title,
		information = {},
		type,
		action,
		modalId;
	let success = false;
	function onSubmitEvent() {
		success = true;
	}

	$: {
		if (success) {
			modal.close(modalId);
		}
	}
</script>

<ModalWrapper {modalId}>
	{#if !success}
		<AddressForm
			{title}
			withoutShadow
			bind:information
			{type}
			{action}
			on:submitEvent={onSubmitEvent}
		/>
	{/if}
</ModalWrapper>
