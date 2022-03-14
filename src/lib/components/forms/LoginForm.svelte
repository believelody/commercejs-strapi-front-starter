<script>
    import { createEventDispatcher } from 'svelte';
    import { t } from '$lib/i18n';
    import api from '$api';
    import { media } from "$lib/stores";
    import {emailValidation} from '$utils/form.util';
    import TextInput from '$elements/input/TextInput.svelte';
    import PrimaryButton from '$elements/button/PrimaryButton.svelte';
    import Form from '$elements/form/Form.svelte';
    import { disableCloseModal, resetModalCloseOptions } from '$elements/modal/Modal.svelte';

    export let withoutShadow = false, title = $t("auth.login.title");
    let identifier, password, loading = false, hasError = false;
    const dispatch = createEventDispatcher();

    async function submit() {
        disableCloseModal()
        loading = true;
        hasError = false;
        const res = await api.auth.login(identifier, password);
        if (res.success) {
            dispatch("submitEvent", { authType: "login" });
        } else {
            hasError = true;
            resetModalCloseOptions();
        }
        loading = false;
    }

    $: isValid = !!(identifier && password && emailValidation(identifier))
</script>

<style>
    /* your styles go here */
</style>

<Form id="identity-form" on:submit={submit} {withoutShadow}>
    <h3 slot="header" class="tracking-wide font-semibold text-neutral-dark my-2 text-center">{title}</h3>
    <svelte:fragment slot="content">
        <TextInput
            name="identifier"
            id="identifier"
            type="email"
            required
            label={$t('identity.email.label')}
            placeholder={$t('identity.email.placeholder')}
            value={identifier}
            on:input={e => identifier = e.target.value}
            on:focus={() => hasError = false}
            align={$media.mobile ? "vertical" : "horizontal"}
        />
        <TextInput
            name="password"
            id="password"
            type="password"
            required
            label={$t('identity.password.label')}
            placeholder={$t('identity.password.placeholder')}
            value={password}
            on:input={e => password = e.target.value}
            on:focus={() => hasError = false}
            align={$media.mobile ? "vertical" : "horizontal"}
        />
        {#if hasError}
            <div class="w-full flex items-center justify-center">
                <span class="text-sm text-danger">{$t("auth.login.failed")}</span>
            </div>
        {/if}
        <div class="w-full flex items-center justify-center">
            <button type="button" class="text-sm text-neutral text-center">{$t("identity.password-forgotten")} ?</button>
        </div>
        <div class="mx-auto-auto grid grid-cols-1 md:grid-cols-5 gap-y-2 items-center">
            <PrimaryButton class="col-span-2" type="submit" disabled={!isValid || loading}>{$t(`auth.login.${loading ? "loading" : "submit"}`)}</PrimaryButton>
            <span class="text-center">{$t("common.or")}</span>
            <PrimaryButton disabled={loading} class="col-span-2" outlined type="button" on:click={e => dispatch("toggleAuth")}>{$t("auth.register.submit")}</PrimaryButton>
        </div>
    </svelte:fragment>
</Form>