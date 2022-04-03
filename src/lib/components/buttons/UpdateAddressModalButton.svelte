<script>
	import { t } from '$lib/i18n';
	import PrimaryButton from '$elements/button/PrimaryButton.svelte';
	import AddressModal from '../modals/AddressModal.svelte';
	import { modal } from '$lib/elements/modal/Modal.svelte';

	export let information;

	function showModal() {
		modal.open({
			component: AddressModal,
			props: {
				title: $t(`account.addresses.${information.type}.label`),
				type: information.type,
				information,
				action: 'update'
			}
		});
	}
</script>

<PrimaryButton outlined on:click={showModal} {...$$restProps}>
	{$t('account.addresses.update')}
</PrimaryButton>

<style>
	/* your styles go here */
</style>
