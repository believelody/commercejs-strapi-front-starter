<script>
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n';
	import api from '$api';
	import { sidebar } from '$lib/stores';
	import PrimaryButton from '$elements/button/PrimaryButton.svelte';
	import { notifications } from '$elements/notification/Notification.svelte';

	export let item;
	let loading = false;
	const dispatch = createEventDispatcher();

	async function chooseAddress() {
		loading = true;
		dispatch('loading', { loading });
		const res = await api.address.choose(item);
		if (res.success) {
			notifications.success({
				title: $t(`notifications.address.title.${item.type}`),
				message: $t(`notifications.address.message.select`)
			});
			$sidebar = null;
		}
		loading = false;
		dispatch('loading', { loading });
	}
</script>

<PrimaryButton on:click={chooseAddress} disabled={loading}>
	{$t('account.addresses.choose')}
</PrimaryButton>

<style>
	/* your styles go here */
</style>
