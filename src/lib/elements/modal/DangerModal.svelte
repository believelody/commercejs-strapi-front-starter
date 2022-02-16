<script>
	import { t } from '$lib/i18n';
	import DangerButton from '../button/DangerButton.svelte';
	import LinkButton from '../button/LinkButton.svelte';
	import ModalWrapper from './ModalWrapper.svelte';
	import { closeModal } from './Modal.svelte';

	export let title,
		description,
		actionText = $t('modal.cta.text.default'),
		cancelText = $t('modal.cancel.text'),
		loadingText = $t('modal.loading.text.deleting'),
		actionCallback = null;
	let loading = false;

	async function actionFn() {
		try {
			loading = true;
			if (actionCallback) {
				await actionCallback();
			}
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	}
</script>

<ModalWrapper>
	<h3 class="my-4 leading-6 font-medium text-neutral-dark" id="modal-title">
		{title}
	</h3>
	<p class="my-2 text-md text-neutral-dark">
		{description}
	</p>
	<section class="px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-2">
		<DangerButton on:click={actionFn} disabled={loading} class="w-full md:w-auto">
			{#if loading}
				{loadingText}
			{:else}
				{actionText}
			{/if}
		</DangerButton>
		<LinkButton on:click={closeModal} class=" md:order-first">
			{cancelText}
		</LinkButton>
	</section>
</ModalWrapper>

<style></style>
