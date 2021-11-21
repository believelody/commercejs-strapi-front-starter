<script>
    import { t } from '$lib/i18n';
    import { checkout, checkoutLoading, modal } from '$lib/stores';
    import { checkDiscount } from '$lib/actions/checkout';
    import Fieldset from '../field/Fieldset.svelte';
    import InputField from "../field/InputField.svelte";
    import DiscountFailedModal from './DiscountFailedModal.svelte';
    import DiscountSuccessModal from './DiscountSuccessModal.svelte';

    let code, isCodeValid, loading = false;

    async function submit() {
        loading = true;
        isCodeValid = await checkDiscount($checkout.id, code);
        loading = false;
        code = "";
        modal.set({
            show: isCodeValid ? DiscountSuccessModal : DiscountFailedModal
        });
    }
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">{$t("discount.title")}</h2>
    <form on:submit|preventDefault={submit}>
        <Fieldset>
            <div class="w-full flex flex-col xl:flex-row xl:justify-between">
                <InputField
                    name="code"
                    placeholder={$t('discount.placeholder')}
                    value={code}
                    on:input={e => code = e.target.value}
                />
                <button
                    disabled={!code || $checkoutLoading || loading}
                    type="submit"
                    class="text-center xl:w-1/3 px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">
                    {$t("common.validate")}
                </button>
            </div>
        </Fieldset>
    </form>
</div>