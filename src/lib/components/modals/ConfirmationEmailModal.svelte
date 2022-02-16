<script>
	import { t } from '$lib/i18n';
	import api from '$lib/api';
	import ConfirmationEmailForm from '../forms/ConfirmationEmailForm.svelte';
	import CheckCircleIcon from '$lib/elements/icon/CheckCircleIcon.svelte';
	import { closeModal } from '../../elements/modal/Modal.svelte';
	import ModalWrapper from '../../elements/modal/ModalWrapper.svelte';
	import PrimaryButton from '../../elements/button/PrimaryButton.svelte';

	let success = false;

	async function onSubmitEvent({ detail }) {
		if (detail.success) {
			success = detail.success;
			await api.auth.getMe();
		}
	}
</script>

<ModalWrapper>
	{#if success}
		<h3 class="text-neutral-dark font-medium border-b pb-3 mb-3 flex items-center">
			<span class="bg-success-light-2 rounded-full p-1">
				<CheckCircleIcon color="success" />
			</span>
			<span class="ml-8">{$t(`auth.code.success.title`)}</span>
		</h3>
		{@html $t(`auth.code.success.text`)}
		<h5 class="w-full text-center text-neutral-dark">{$t('common.or')}</h5>
		<div class="flex-center-middle text-neutral-dark">
			<PrimaryButton on:click={closeModal}>
				<a class="p-2 rounded" href="/my-account">{$t('auth.code.success.link')}</a>
			</PrimaryButton>
		</div>
	{:else}
		<ConfirmationEmailForm withoutShadow on:submitEvent={onSubmitEvent} />
	{/if}
</ModalWrapper>

<style>
	/* your styles go here */
</style>
