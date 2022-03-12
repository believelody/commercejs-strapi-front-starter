<script>
	import { t } from '$lib/i18n';
	import PrimaryButton from '$elements/button/PrimaryButton.svelte';
	import AddressModal from '../modals/AddressModal.svelte';
	import { openModal } from '$elements/modal/Modal.svelte';

	export let type,
		withoutShadow = false;
</script>

<PrimaryButton
	on:click={() =>
		openModal({
			component: AddressModal,
			props: { title: $t(`account.addresses.${type}.label`), type, withoutShadow, action: 'create' }
		})}
	{...$$restProps}
>
	+ {$t(`account.addresses.${type}.label`)}
</PrimaryButton>

<style>
	/* your styles go here */
</style>
