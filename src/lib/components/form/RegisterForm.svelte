<script>
    import { createEventDispatcher } from 'svelte';
    import { t } from '$lib/i18n';
    import InputField from '../field/InputField.svelte';

    const dispatch = createEventDispatcher();
    let firstname, lastname, email, password;

    async function submit() {
        try {
            console.log(firstname, lastname, email, password);
        } catch (error) {
            console.log(error);
        }
    }

    $: isValid = !!(firstname || password || lastname || email);
</script>

<style>
    /* your styles go here */
</style>

<form id="identity-form" on:submit|preventDefault={submit}>
    <fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
        <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
            <InputField
                name="firstname"
                required
                label={$t('identity.firstname.label')}
                placeholder={$t('identity.firstname.placeholder')}
                bind:value={firstname}
            />
            <InputField
                name="lastname"
                required
                label={$t('identity.lastname.label')}
                placeholder={$t('identity.lastname.placeholder')}
                bind:value={lastname}
            />
        </div>
        <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
            <InputField
                name="identifier"
                type="email"
                required
                label={$t('identity.email.label')}
                placeholder={$t('identity.email.placeholder')}
                bind:value={email}
            />
            <InputField
                name="password"
                type="password"
                required
                label={$t('identity.password.label')}
                placeholder={$t('identity.password.placeholder')}
                bind:value={password}
            />
        </div>
        <div class="my-4 xl:mx-4 flex flex-col xl:flex-row justify-center items-center">
            <button disabled={!isValid} type="submit" class="text-center w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">{$t("auth.register")}</button>
            <span class="px-16 my-2">{$t("common.or")}</span>
            <button type="button" on:click={e => dispatch("auth")} class="w-1/2 xl:py-2 rounded xl:border xl:border-indigo-600 text-indigo-600 font-medium hover:underline hover:text-indigo-500 hover:border-indigo-500 ml-2">{$t("auth.login")}</button>
        </div>
    </fieldset>
</form>