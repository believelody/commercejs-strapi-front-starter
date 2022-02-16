<script>
	import {getContext} from "svelte";
	import { t } from '$lib/i18n';
	import DangerButton from "../button/DangerButton.svelte";
	import LinkButton from "../button/LinkButton.svelte";

	export let title,
		description,
		actionText = $t('modal.cta.text.default'),
		cancelText = $t('modal.cancel.text'),
		loadingText = $t('modal.loading.text.deleting'),
		actionCallback = null;
	let loading = false;
	const { close } = getContext("simple-modal");

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

<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
	<div class="sm:flex sm:items-start">
		<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
			<h3 class="leading-6 font-medium text-neutral-dark" id="modal-title">
				{title}
			</h3>
			<div class="mt-2">
				<p class="text-md text-neutral-dark">
					{description}
				</p>
			</div>
		</div>
	</div>
</div>
<div class="px-4 md:px-0 md:w-1/2 md:ml-auto grid grid-cols-1 md:grid-cols-2 gap-4">
	<DangerButton
		on:click={actionFn}
		disabled={loading}
		class="w-full md:w-auto"
	>
		{#if loading}
			{loadingText}
		{:else}
			{actionText}
		{/if}
	</DangerButton>
	<LinkButton
		on:click={close}
		class=" md:order-first"
	>
		{cancelText}
	</LinkButton>
</div>

<style></style>
