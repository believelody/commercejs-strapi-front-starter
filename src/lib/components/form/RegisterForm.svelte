<script>
    import { createEventDispatcher } from 'svelte';
    import { t } from '$lib/i18n';
    import api from '$lib/api';
    import InputField from '../field/InputField.svelte';
    import { emailValidation } from '../../utils/form.util';
    import Fields from '../field/Fields.svelte';

    export let withoutShadow = false, title;
    let firstname, lastname, email, password, loading = false, hasError = false;
    const dispatch = createEventDispatcher();

    async function submit() {
        loading = true;
        hasError = false;
        const res = await api.auth.register(firstname, lastname, email, password);
        if (res.success) {
            dispatch("submitEvent", { user: { firstname, lastname }, authType: "register" });
            firstname = lastname = email = password = "";
        } else {
            hasError = true;
        }
        loading = false;
    }

    $: isValid = !!(firstname && password && email && emailValidation(email));
</script>

<style>
    /* your styles go here */
</style>

<form id="register-form" on:submit|preventDefault={submit}>
    <Fields {withoutShadow} class="flex-col">
        <!-- <div class="w-full flex justify-between border-b border-gray-300 py-3 px-2">
            <span class="sm:text-right xl:mr-2">{$t("identity.civility.title")}</span>
            <div class="flex justify-around flex-grow">
                <RadioField
                    label={$t("identity.civility.m")}
                    name="gender"
                    value="m"
                    id="male"
                    on:change={() => gender = "m"}
                />
                <RadioField
                    label={$t("identity.civility.f")}
                    name="gender"
                    value="f"
                    id="female"
                    on:change={() => gender = "f"}
                />
            </div>
        </div> -->
        <InputField
            name="firstname"
            required
            label={$t('identity.firstname.label')}
            placeholder={$t('identity.firstname.placeholder')}
            on:input={e => firstname = e.target.value}
            on:focus={() => hasError = false}
        />
        <InputField
            name="lastname"
            label={$t('identity.lastname.label')}
            placeholder={$t('identity.lastname.placeholder')}
            on:input={e => lastname = e.target.value}
            on:focus={() => hasError = false}
        />
        <InputField
            name="email"
            type="email"
            required
            label={$t('identity.email.label')}
            placeholder={$t('identity.email.placeholder')}
            on:input={e => email = e.target.value}
            on:focus={() => hasError = false}
        />
        <InputField
            name="password"
            type="password"
            hint={$t("identity.password.hint")}
            required
            label={$t('identity.password.label')}
            placeholder={$t('identity.password.placeholder')}
            on:input={e => password = e.target.value}
            on:focus={() => hasError = false}
        />
        {#if hasError}
            <div class="w-full flex items-center justify-center mt-2">
                <p class="text-sm text-red-400">{$t("auth.register.failed")}</p>
            </div>
        {/if}
        <div class="w-auto my-4 xl:mx-4 flex flex-col xl:flex-row justify-center items-center">
            <button type="submit" disabled={!isValid || loading} class="text-center w-1/2 px-6 py-3 border border-transparent rounded shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">{$t(`auth.register.${loading ? "loading" : "submit"}`)}</button>
            <span class="px-16 my-2">{$t("common.or")}</span>
            <button type="button" on:click={e => dispatch("toggleAuth")} class="w-1/2 xl:py-2 rounded xl:border xl:border-indigo-600 text-indigo-600 font-medium hover:underline hover:text-indigo-500 hover:border-indigo-500 ml-2">{$t("auth.login.submit")}</button>
        </div>
    </Fields>
</form>