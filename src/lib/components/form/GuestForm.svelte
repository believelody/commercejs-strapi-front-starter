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
            label={$t('identity.firstname.label')}
            placeholder={$t('identity.firstname.placeholder')}
            value={data.firstname}
            on:change={onChange}
            required
        />
        <InputField
            name="lastname"
            label={$t('identity.lastname.label')}
            placeholder={$t('identity.lastname.placeholder')}
            value={data.lastname}
            on:change={onChange}
        />
    </div>
    <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
        <InputField
            name="email"
            type="email"
            label={$t('identity.email.label')}
            placeholder={$t('identity.email.placeholder')}
            value={data.email}
            on:change={onChange}
            required
        />
        <InputField
            name="telephone"
            label={$t('identity.telephone.label')}
            placeholder={$t('identity.telephone.placeholder')}
            value={data.telephone}
            on:change={onChange}
        />
    </div>
</fieldset>
