<script>
	import { t } from '$lib/i18n';
	import AddressForm from '../forms/AddressForm.svelte';
	import ModalWrapper from '$elements/modal/ModalWrapper.svelte';
	import { closeModal, openModal } from '$elements/modal/Modal.svelte';
	import InfoModal from '$elements/modal/InfoModal.svelte';

	export let title, information, type, action;

	function onSubmitEvent() {
		closeModal();
	}
</script>

<ModalWrapper>
	<AddressForm {title} withoutShadow {information} {type} {action} on:submitEvent={onSubmitEvent} />
</ModalWrapper>
