<script>
    import {t} from '$lib/i18n';
    import api from '$lib/api';
    import InputField from '../field/InputField.svelte';
    import SelectField from '../field/SelectField.svelte';
    import Fields from "../field/Fields.svelte";

    export let information = {}, title, checkoutId, hideSubmitButton = false, submitLabel = "", withoutShadow = false,
        hideTitleAddress = false;
    let loading = false;

    function onInput(e) {
        information[e.target.name] = e.target.value;
    }

    function submit(e) {

    }

    $: countriesPromise = api.address.getCountries();
    $: countriesPromise.then(res => console.log(res))
    // $: subdivisionsPromise = checkoutId && information?.country && api.checkout.getSubdivisions(checkoutId, information.country);
    $: isValid = false;
</script>

<style>
    * {
        box-sizing: border-box;
    }
</style>

<form id="address-form" on:submit|preventDefault={null}>
    <h2 class="uppercase tracking-wide text-xl font-semibold text-gray-700 my-2">{title}</h2>
    <Fields class="flex-col" {withoutShadow}>
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
            <SelectField
                name="country"
                class="flex w-full h-12 py-3 items-center select relative px-0 xl:px-2 border-b border-gray-300 xl:border-none"
                bind:value={information.country}
                label={$t('checkout.address.country.label')}
                required
            >
                <svelte:fragment slot="items">
                        {#await countriesPromise}
                            <option value="" class="px-2 xl:px-0 xl:mr-2">{$t("checkout.address.country.loading")}</option>
                        {:then {countries}}
                            <option value="" class="text-gray-400">{$t('checkout.address.country.placeholder')}</option>
                            {#each Object.entries(countries) as [key, value]}
                                <option selected={key === information.country} class="text-black" value={key}>{value}</option>
                            {/each}
                            {:catch error}
                            <option value="" className="text-gray-400">{$t('checkout.address.country.placeholder')}</option>
                        {/await}
                </svelte:fragment>
            </SelectField>
<!--            <SelectField-->
<!--                name="subdivision"-->
<!--                class="flex xl:w-3/4 w-full h-12 py-3 items-center select relative px-0 xl:px-2 border-b border-gray-300 xl:border-none"-->
<!--                disabled={!information.country}-->
<!--                bind:value={information.subdivision}-->
<!--                label={$t('checkout.address.subdivision.label')}-->
<!--                required-->
<!--            >-->
<!--                <svelte:fragment slot="items">-->
<!--                    {#if information.country}-->
<!--                        {#await subdivisionsPromise}-->
<!--                            <option value="" class="px-2 xl:px-0 xl:mr-2">{$t('checkout.address.subdivision.loading')}</option>-->
<!--                        {:then subdivisions}-->
<!--                            <option value="" class="text-gray-400">{$t('checkout.address.subdivision.placeholder')}</option>-->
<!--                            {#each Object.entries(subdivisions) as [key, value]}-->
<!--                                <option selected={key === information.subdivision} class="text-black" value={key}>{value}</option>-->
<!--                            {/each}-->
<!--                        {/await}-->
<!--                    {:else}-->
<!--                        <option value="" class="text-gray-400 px-2 xl:px-0 xl:mr-2">{$t('checkout.address.subdivision.error')}</option>-->
<!--                    {/if}-->
<!--                </svelte:fragment>-->
<!--            </SelectField>-->
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