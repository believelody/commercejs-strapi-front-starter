<script>
    import { t } from '$lib/i18n';
    import InputField from '../field/InputField.svelte';

    export let data;
    
    function onChange(e) {
        data[e.target.name] = e.target.value;
    }
</script>

<style>
    /* your styles go here */
</style>

<fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
    <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
        <InputField
            name="firstname"
            label={$t('checkout.identity.firstname.label')}
            placeholder={$t('checkout.identity.firstname.placeholder')}
            value={data.firstname}
            on:change={onChange}
            required
        />
        <InputField
            name="lastname"
            label={$t('checkout.identity.lastname.label')}
            placeholder={$t('checkout.identity.lastname.placeholder')}
            value={data.lastname}
            on:change={onChange}
        />
    </div>
    <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
        <InputField
            name="email"
            type="email"
            label={$t('checkout.identity.email.label')}
            placeholder={$t('checkout.identity.email.placeholder')}
            value={data.email}
            on:change={onChange}
            required
        />
        <InputField
            name="telephone"
            label={$t('checkout.identity.telephone.label')}
            placeholder={$t('checkout.identity.telephone.placeholder')}
            value={data.telephone}
            on:change={onChange}
        />
    </div>
    <div class="my-4 xl:mx-4 flex flex-col xl:flex-row justify-center items-center">
        <button class="w-1/2 xl:py-2 rounded xl:border xl:border-indigo-600 text-indigo-600 font-medium hover:underline hover:text-indigo-500 hover:border-indigo-500 ml-2">{$t("auth.register")} ?</button>
    </div>
</fieldset>
