<script>
	import { t } from '$lib/i18n';
	import { checkout, checkoutLoading } from '$lib/stores';
	import api from '$api';
	import Form from '$elements/form/Form.svelte';
	import TextInput from '$elements/input/TextInput.svelte';
	import PrimaryButton from '$elements/button/PrimaryButton.svelte';
	import DiscountSuccessModal from '../modals/DiscountSuccessModal.svelte';
	import DiscountFailedModal from '../modals/DiscountFailedModal.svelte';
	import { openModal } from '$elements/modal/Modal.svelte';

	export let withoutShadow = false;
	let code,
		isCodeValid,
		loading = false;

	async function submit() {
		loading = true;
		isCodeValid = await api.checkout.checkDiscount($checkout.id, code);
		openModal({
			component: isCodeValid ? DiscountSuccessModal : DiscountFailedModal
		});
		loading = false;
		code = '';
	}
</script>

<div class="box-border max-w-md mx-2 md:mx-auto">
	<Form on:submit={submit} {withoutShadow}>
		<h3 slot="header" class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
			{$t('discount.title')}
		</h3>
		<div class="p-2 grid grid-cols-3 gap-x-2 md:gap-x-4" slot="content">
			<TextInput
				name="code"
				placeholder={$t('discount.placeholder')}
				value={code}
				class="col-span-2"
				on:input={(e) => (code = e.target.value)}
			/>
			<PrimaryButton disabled={!code || $checkoutLoading || loading} type="submit">
				{$checkoutLoading || loading ? $t('common.update') : $t('common.validate')}
			</PrimaryButton>
		</div>
	</Form>
</div>

<style>
	/* your styles go here */
</style>
