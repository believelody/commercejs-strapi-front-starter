<script>
	import { t } from '$lib/i18n';
	import DangerButton from '$elements/button/DangerButton.svelte';
	import DangerModal from '$elements/modal/DangerModal.svelte';
	import { modal } from '$elements/modal/Modal.svelte';

	export let title, description, actionCallback, type;

	async function showRemoveModal() {
		modal.open({
			component: DangerModal,
			props: {
				title,
				description,
				actionCallback,
				notificationHeading: $t(`notifications.address.title.${type}`),
				notificationText: $t('notifications.address.message.remove')
			}
		});
	}
</script>

<DangerButton outlined on:click={showRemoveModal} {...$$restProps}>
	{$t('common.delete')}
</DangerButton>

<style>
	/* your styles go here */
</style>
