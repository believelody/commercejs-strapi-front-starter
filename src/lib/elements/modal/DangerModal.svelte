<script>
	import { t } from '$lib/i18n';
	import DangerButton from '../button/DangerButton.svelte';
	import LinkButton from '../button/LinkButton.svelte';
	import { modal } from './Modal.svelte';
	import ModalWrapper from './ModalWrapper.svelte';

	export let title,
		description,
		actionText = $t('modal.cta.text.default'),
		cancelText = $t('modal.cancel.text'),
		loadingText = $t('modal.loading.text.deleting'),
		actionCallback = null,
		modalId;
	let loading = false;

	async function actionFn() {
		try {
			loading = true;
			if (actionCallback) {
				await actionCallback(modalId);
			}
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	}

	$: console.log(modalId);
</script>

<ModalWrapper {modalId}>
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
		<LinkButton on:click={() => modal.close(modalId)} class=" md:order-first">
			{cancelText}
		</LinkButton>
	</section>
</ModalWrapper>

<style></style>
