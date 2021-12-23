<script>
    import { createEventDispatcher } from 'svelte';
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import { emailValidation } from '../../utils/form.util';
    import InputField from '../field/InputField.svelte';
    import Fields from '../field/Fields.svelte';

    export let withoutShadow = false, title;
    let identifier, password, loading = false, hasError = false;
    const dispatch = createEventDispatcher();

    async function submit() {
        loading = true;
        hasError = false;
        const res = await api.auth.login(identifier, password);
        if (res.success) {
            dispatch("submitEvent", { authType: "login" });
        } else {
            hasError = true;
        }
        loading = false;
    }

    $: isValid = !!(identifier && password && emailValidation(identifier))
</script>

<style>
    /* your styles go here */
</style>

<form id="identity-form" on:submit|preventDefault={submit}>
    {#if title}
        <h2 class="uppercase tracking-wide text-xl font-semibold text-gray-700 my-2">{title}</h2>
    {/if}
    <Fields class="flex-col" {withoutShadow}>
        <InputField
            name="identifier"
            type="email"
            required
            label={$t('identity.email.label')}
            placeholder={$t('identity.email.placeholder')}
            value={identifier}
            on:input={e => identifier = e.target.value}
            on:focus={() => hasError = false}
        />
        <InputField
            name="password"
            type="password"
            required
            label={$t('identity.password.label')}
            placeholder={$t('identity.password.placeholder')}
            value={password}
            on:input={e => password = e.target.value}
            on:focus={() => hasError = false}
        />
        {#if hasError}
            <div class="w-full flex items-center justify-center mt-2">
                <span class="text-sm text-red-400">{$t("auth.login.failed")}</span>
            </div>
        {/if}
        <div class="w-full flex items-center justify-center mt-2">
            <button type="button" class="text-sm text-gray-400 text-center">{$t("identity.password-forgotten")} ?</button>
        </div>
        <div class="w-auto my-2 xl:mx-4 flex flex-col xl:flex-row justify-center items-center">
            <button disabled={!isValid || loading} type="submit" class="text-center w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">{$t(`auth.login.${loading ? "loading" : "submit"}`)}</button>
            <span class="px-16 my-2">{$t("common.or")}</span>
            <button type="button" on:click={e => dispatch("toggleAuth")} class="w-1/2 xl:py-2 rounded xl:border xl:border-indigo-600 text-indigo-600 font-medium hover:underline hover:text-indigo-500 hover:border-indigo-500 ml-2">{$t("auth.register.submit")}</button>
        </div>
    </Fields>
</form>