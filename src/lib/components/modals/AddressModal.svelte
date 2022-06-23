<script>
	import { t } from '$lib/i18n';
	import AddressForm from '../forms/AddressForm.svelte';
	import ModalWrapper from '$elements/modal/ModalWrapper.svelte';
	import { modal } from '$elements/modal/Modal.svelte';
	import { notifications } from '$elements/notification/Notification.svelte';

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
			notifications.success({
				title: $t(`account.addresses.${type}.label`),
				message: $t('account.addresses.saved')
			});
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
