<script>
    import { t } from '$lib/i18n';
    import { checkout } from '$lib/stores'
    import { getCountries, getSubdivisions } from '$lib/actions/checkout'
    import InputField from '../field/InputField.svelte';
    import SelectField from '../field/SelectField.svelte';

    export let information, title;

    function onChange(e) {
        information[e.target.name] = e.target.value;
    }
</script>

<style>
    * {
        box-sizing: border-box;
    }
</style>

<form id="address-form">
    <h2 class="uppercase tracking-wide text-xl font-semibold text-gray-700 my-2">{title}</h2>
    <fieldset class="mb-3 bg-white shadow-xl rounded text-gray-600 flex-wrap flex">
        <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
            <InputField
                name="address1"
                label={$t('checkout.address.address1.label')}
                placeholder={$t('checkout.address.address1.placeholder')}
                value={information.address1}
                on:change={onChange}
            />
            <InputField
                name="address2"
                label={$t('checkout.address.address2.label')}
                placeholder={$t('checkout.address.address2.placeholder')}
                value={information.address2}
                on:change={onChange}
            />
        </div>
        <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
            <InputField
                name="city"
                label={$t('checkout.address.city.label')}
                placeholder={$t('checkout.address.city.placeholder')}
                value={information.city}
                on:change={onChange}
            />
            <InputField
                name="zip"
                label={$t('checkout.address.zip.label')}
                placeholder={$t('checkout.address.zip.placeholder')}
                value={information.zip}
                on:change={onChange}
            />
        </div>
        <div class="w-full flex flex-col xl:flex-row justify-between">
            <SelectField
                name="country"
                class="flex xl:w-1/4 w-full h-12 py-3 items-center select relative px-0 xl:px-2 border-b border-gray-300 xl:border-none"
                bind:value={information.country}
                label={$t('checkout.address.country.label')}
            >
                <svelte:fragment slot="items">
                    {#await getCountries($checkout.id)}
                        <option value="" class="px-2 xl:px-0 xl:mr-2">{$t("checkout.address.country.loading")}</option>
                    {:then countries}
                        <option value="" class="text-gray-400">{$t('checkout.address.country.placeholder')}</option>
                        {#each Object.entries(countries) as [key, value]}
                            <option selected={key === information.country} class="text-black" value={key}>{value}</option>
                        {/each}
                    {/await}
                </svelte:fragment>
            </SelectField>
            <SelectField
                name="subdivision"
                class="flex xl:w-3/4 w-full h-12 py-3 items-center select relative px-0 xl:px-2 border-b border-gray-300 xl:border-none"
                disabled={!information.country}
                bind:value={information.subdivision}
                label={$t('checkout.address.subdivision.label')}
            >
                <svelte:fragment slot="items">
                    {#if information.country}
                        {#await getSubdivisions($checkout.id, information.country)}
                            <option value="" class="px-2 xl:px-0 xl:mr-2">{$t('checkout.address.subdivision.loading')}</option>
                        {:then subdivisions}
                            <option value="" class="text-gray-400">{$t('checkout.address.subdivision.placeholder')}</option>
                            {#each Object.entries(subdivisions) as [key, value]}
                                <option selected={key === information.subdivision} class="text-black" value={key}>{value}</option>
                            {/each}
                        {/await}
                    {:else}
                        <option value="" class="text-gray-400 px-2 xl:px-0 xl:mr-2">{$t('checkout.address.subdivision.error')}</option>
                    {/if}
                </svelte:fragment>
            </SelectField>
        </div>
    </fieldset>
</form>