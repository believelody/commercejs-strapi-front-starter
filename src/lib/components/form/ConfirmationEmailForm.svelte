<script>
    import { createEventDispatcher } from 'svelte';
    import { t } from '$lib/i18n';
    import { user } from '$lib/stores';
    import api from '$lib/api';
    import Fields from '../field/Fields.svelte';
    import InputField from "../field/InputField.svelte";

    export let withoutShadow = false;
    let code = "", loading = false, hasError = false, codeResent = false, errorCode = null;
    const dispatch = createEventDispatcher();

    async function submit() {
        loading = true;
        const res = await api.auth.codeVerification($user.email, code);
        if (res.statusCode == 400) {
            hasError = true;
            errorCode = res.message;
        } else if (res.success) {
            dispatch("submitEvent", { success: res.success });
        }
        loading = false;
    }

    async function resendCode() {
        loading = true;
        const res = await api.auth.resendCode($user.email);
        if (res.sent) {
            codeResent = true;
        } else if (res.error) {
            hasError = true;
        }
        loading = false;
    }
</script>

<style>
    /* your styles go here */
</style>

<h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 text-center my-2">{$t("auth.code.title")}</h2>
<form id="confirm-email-form" on:submit|preventDefault={submit}>
    <Fields {withoutShadow}>
        <div class="w-full flex flex-col xl:flex-row xl:justify-between">
                <InputField
                    name="code"
                    placeholder={$t('auth.code.placeholder')}
                    value={code}
                    on:input={e => code = e.target.value}
                    on:focus={() => hasError = false}
                />
                <button
                    disabled={!code || loading}
                    type="submit"
                    class="text-center xl:w-1/3 px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">
                    {$t("common.validate")}
                </button>
            </div>
    </Fields>
</form>
<button disabled={loading} on:click={resendCode} class="border-none text-center cursor-pointer lg:text-left text-sm text-gray-400 italic underline disabled:opacity-75 disabled:cursor-not-allowed">{$t("auth.code.no-code")}</button>
{#if codeResent}
    <h5 class="text-center lg:text-left text-sm text-indigo-500 py-2">{$t("auth.code.resent")}</h5>
{:else if  hasError}
    {#if errorCode}
        <h5 class="text-center lg:text-left text-sm text-red-400 py-2">{$t(`auth.${errorCode}`)}</h5>
    {:else}
        <h5 class="text-center lg:text-left text-sm text-red-400 py-2">{$t("auth.code.error")}</h5>
    {/if}
{/if}