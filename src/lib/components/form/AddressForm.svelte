<script>
    import {t} from '$lib/i18n';
    import api from '$lib/api';
    import InputField from '../field/InputField.svelte';
    import SelectField from '../field/SelectField.svelte';
    import Fields from "../field/Fields.svelte";
    import {onMount} from "svelte";
    import SearchField from "../field/SearchField.svelte";
    import {requiredFieldsValidation} from "../../utils/form.util";

    export let information = {}, title, checkoutId, hideSubmitButton = false, submitLabel = "", withoutShadow = false,
        hideTitleAddress = false;
    let loading = false, countries = [];

    function onInput(e) {
        information[e.target.name] = e.target.value;
    }

    function submit(e) {
        console.log(information)
    }

    onMount(async () => {
        countries = await api.address.getCountries();
    });

    // $: countriesPromise = api.address.getCountries();
    // $: subdivisionsPromise = checkoutId && information?.country && api.checkout.getSubdivisions(checkoutId, information.country);
    $: isValid = requiredFieldsValidation(information, ["address1", "city", "zip", "country"]);
    $: console.log(information);
</script>

<style>
    * {
        box-sizing: border-box;
    }
</style>

<form id="address-form" on:submit|preventDefault={submit}>
    <h2 class="uppercase tracking-wide text-xl font-semibold text-gray-700 my-2">{title}</h2>
    <Fields class="flex-col overflow-y-hidden" {withoutShadow}>
        {#if !hideTitleAddress}
            <InputField
                    name="title"
                    label={$t('checkout.address.title.label')}
                    placeholder={$t('checkout.address.title.placeholder')}
                    value={information.title}
                    on:input={onInput}
                    required
            />
        {/if}
        <InputField
            name="address1"
            label={$t('checkout.address.address1.label')}
            placeholder={$t('checkout.address.address1.placeholder')}
            value={information.address1}
            on:input={onInput}
            required
        />
        <InputField
                name="address2"
                label={$t('checkout.address.address2.label')}
                placeholder={$t('checkout.address.address2.placeholder')}
                value={information.address2}
                on:input={onInput}
        />
        <InputField
            name="city"
            label={$t('checkout.address.city.label')}
            placeholder={$t('checkout.address.city.placeholder')}
            value={information.city}
            on:input={onInput}
            required
        />
        <InputField
                name="zip"
                label={$t('checkout.address.zip.label')}
                placeholder={$t('checkout.address.zip.placeholder')}
                value={information.zip}
                on:input={onInput}
                required
        />
        <SearchField
                name="countries"
                label={$t('checkout.address.country.label')}
                placeholder={$t('checkout.address.country.placeholder')}
                on:value={e => information.country = e.detail}
                items={Object.entries(countries).map(([key, value]) => ({key, value}))}
                required
        />
        {#if !hideSubmitButton}
            <div class="flex justify-center flex-grow pt-3 pb-2">
                <button disabled={!isValid || loading} type="submit" class="text-center w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">
                    {#if submitLabel}
                        {submitLabel}
                    {:else}
                        {$t(`common.${loading ? "update" : "validate"}`)}
                    {/if}
                </button>
            </div>
        {/if}
    </Fields>
</form>