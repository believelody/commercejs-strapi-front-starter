<script>
    import { t } from '$lib/i18n';
    import { checkout, checkoutLoading } from '$lib/stores';
    import api from '$lib/api';
    import Form from '../../elements/form/Form.svelte';
    import TextInput from "../../elements/inputs/TextInput.svelte";
    import DiscountFailedModal from '../modals/DiscountFailedModal.svelte';
    import DiscountSuccessModal from '../modals/DiscountSuccessModal.svelte';
    import {getContext} from "svelte";

    export let withoutShadow = false;
    let code, isCodeValid, loading = false;
    const { open } = getContext("simple-modal");

    async function submit() {
        loading = true;
        isCodeValid = await api.checkout.checkDiscount($checkout.id, code);
        loading = false;
        code = "";
        open(isCodeValid ? DiscountSuccessModal : DiscountFailedModal);
    }
</script>

<style>
    /* your styles go here */
</style>

<div class="mx-2 md:mx-12 rounded-md mb-8">
    <Form on:submit class="w-full flex-col xl:flex-row xl:justify-between">
        <h3 slot="header" class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">{$t("discount.title")}</h2>
        <svelte:fragment {withoutShadow}>
            <TextInput
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
        </svelte:fragment>
    </Form>
</div>