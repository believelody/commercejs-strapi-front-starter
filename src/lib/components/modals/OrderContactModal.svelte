<script>
	import { t } from '$lib/i18n';
	import api from '$lib/api';
	import { requiredFieldsValidation } from '../../utils/form.util';
	import ContactForm from '../forms/ContactForm.svelte';
	import WithActionModal from '$lib/elements/modal/WithActionModal.svelte';
	import { closeModal } from '../../elements/modal/Modal.svelte';
	import PrimaryButton from '../../elements/button/PrimaryButton.svelte';
	import { notifications } from '../../elements/notification/Notification.svelte';

	export let reference, customer, orderId;
	let information = { email: customer.email },
		loading = false,
		error;

	function getInformation({ detail }) {
		information.subject = detail.subject;
		information.message = detail.message;
		if (detail.files) {
			information.files = detail.files;
		}
	}

	async function sendEmail() {
		loading = true;
		const res = await api.user.sendOrderEmail(information, orderId);
		if (res.success) {
			notifications.success({
				title: $t('notifications.order.email.title'),
				message: $t('notifications.order.email.message')
			});
			closeModal();
		} else {
			error = res.error;
		}
		loading = false;
	}
	$: isValid = requiredFieldsValidation(information, ['subject', 'message']);
</script>

<WithActionModal>
	<span slot="header" class="text-neutral-dark"
		>{$t('order.modal.contact.title', { reference })}</span
	>
	<div slot="content">
		<h4 class="mx-2">
			<span class="text-neutral-dark">{$t('identity.title')} : </span>
			<span class="text-neutral-dark">{customer.firstname} {customer.lastname}</span>
		</h4>
		<h4 class="mx-2">
			<span class="text-neutral-dark">{$t('identity.email.label')} : </span>
			<span class="text-neutral-dark">{customer.email}</span>
		</h4>
		<ContactForm on:inputEvent={getInformation} withoutShadow hideSubmit />
	</div>
	<PrimaryButton slot="action" disabled={!isValid || loading}
		>{$t('common.contact.send')}</PrimaryButton
	>
</WithActionModal>

<style>
	/* your styles go here */
</style>
