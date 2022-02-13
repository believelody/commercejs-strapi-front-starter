<script>
	import {getContext} from "svelte";
	import { getNotificationsContext } from "svelte-notifications";
	import { t } from '$lib/i18n';

	export let title,
		description,
		actionText = $t('modal.cta.text.default'),
		cancelText = $t('modal.cancel.text'),
		loadingText = $t('modal.loading.text.deleting'),
		notificationHeading = $t("notifications.default.heading"),
		notificationText = $t("notifications.default.description"),
		actionCallback = null;
	let loading = false;
	const { close } = getContext("simple-modal");
    const { addNotification } = getNotificationsContext();

	async function actionFn() {
		try {
			loading = true;
			if (actionCallback) {
				const res = await actionCallback();
				if (res.success) {
					addNotification({
						position: 'bottom-left',
						heading: notificationHeading,
						text: notificationText,
						description: notificationText,
						type: 'success',
						removeAfter: 5000
					});
					close();
				}
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
			<h3 class="text-lg leading-6 font-medium text-gray-900 disabled:opacity-75" id="modal-title">
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
<div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
	<button
		type="button"
		on:click={actionFn}
		disabled={loading}
		class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-75 disabled:cursor-wait"
	>
		{#if loading}
			{loadingText}
		{:else}
			{actionText}
		{/if}
	</button>
	<button
		type="button"
		on:click={close}
		class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-75 disabled:cursor-wait"
	>
		{cancelText}
	</button>
</div>

<style></style>
