<script>
    import { t } from '$lib/i18n';
    import InputField from '../field/InputField.svelte';

    let identifier, password;

    async function submit() {
        try {
            console.log(identifier, password);
        } catch (error) {
            console.log(error);
        }
    }
</script>

<style>
    /* your styles go here */
</style>

<form id="identity-form" on:submit|preventDefault={submit}>
    <fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
        <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
            <InputField
                name="identifier"
                type="email"
                required
                label={$t('checkout.identity.email.label')}
                placeholder={$t('checkout.identity.email.placeholder')}
                bind:value={identifier}
            />
            <InputField
                name="password"
                type="password"
                required
                label={$t('checkout.identity.password.label')}
                placeholder={$t('checkout.identity.password.placeholder')}
                bind:value={password}
            />
        </div>
        <div class="my-4 xl:mx-4 flex flex-col xl:flex-row justify-center items-center">
            <button disabled={!identifier || !password} type="submit" class="text-center w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75">{$t("auth.login")}</button>
            <span class="px-16 my-2">{$t("common.or")}</span>
            <button class="w-1/2 xl:py-2 rounded xl:border xl:border-indigo-600 text-indigo-600 font-medium hover:text-indigo-500 hover:border-indigo-500 ml-2">{$t("auth.register")}</button>
        </div>
    </fieldset>
</form>