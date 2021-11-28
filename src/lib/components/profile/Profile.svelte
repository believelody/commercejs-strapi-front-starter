<script>
    import {navigating} from '$app/stores';
    import {t} from '$lib/i18n';
    import {profile} from '$lib/stores';
    import Fieldset from '../field/Fieldset.svelte';
    import FileField from '../field/FileField.svelte';
    import InputField from '../field/InputField.svelte';
    import MoonLoading from '../loading/MoonLoading.svelte';
    import {clickLinkOutside} from "../../actions/clickOutside";
    import {onMount} from "svelte";
    import CheckboxField from "../field/CheckboxField.svelte";
    import {emailValidation} from "../../utils/form.util";

    let firstname, lastname, birthday, email, subscribed, password = "", hasError = false, loading, isDraft = false;

    async function submit() {

    }

    function resetError() {
        hasError = false;
    }

    onMount(() => {
        if ($profile) {
            firstname = $profile.customer.firstname;
            lastname = $profile.customer.lastname;
            birthday = $profile.customer.birthday;
            email = $profile.customer.email;
            subscribed = $profile.customer.subscribed;
        }

        return () => isDraft = false;
    });

    $: isDraft = firstname !== $profile?.customer.firstname || lastname !== $profile?.customer.lastname || email !== $profile?.customer.email || $profile?.customer.birthday || subscribed !== $profile?.customer.subscribed;
    $: isValid = !!(firstname && lastname && email && emailValidation(email)) && isDraft;
    $: console.log(isDraft);
    $: console.log(isValid);
</script>

<style>
    /* your styles go here */
</style>

{#if !$profile || $navigating}
    <MoonLoading />
{:else}
    <form use:clickLinkOutside={{ isDraft, text: $t("account.draft.confirm") }} on:clicklinkoutside={() => isDraft = false} id="profile-form" on:submit|preventDefault={submit}>
        <Fieldset>
            <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
                <InputField
                        name="firstname"
                        label={$t('identity.firstname.label')}
                        placeholder={$t('identity.firstname.placeholder')}
                        value={firstname}
                        on:input={e => firstname = e.target.value}
                        on:focus={resetError}
                        required
                />
                <InputField
                        name="lastname"
                        label={$t('identity.lastname.label')}
                        placeholder={$t('identity.lastname.placeholder')}
                        value={lastname}
                        on:input={e => lastname = e.target.value}
                        on:focus={resetError}
                        required
                />
            </div>
            <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
                <InputField
                        name="email"
                        type="email"
                        label={$t('identity.email.label')}
                        placeholder={$t('identity.email.placeholder')}
                        value={email}
                        on:input={e => email = e.target.value}
                        on:focus={resetError}
                        required
                />
                <InputField
                        name="password"
                        type="password"
                        label={$t('identity.password.label')}
                        placeholder={$t('identity.password.placeholder')}
                        value={password}
                        on:input={e => password = e.target.value}
                        on:focus={resetError}
                />
            </div>
            <div class="w-full flex flex-col xl:flex-row justify-between xl:border-b xl:border-gray-300">
                <InputField
                        name="birthday"
                        type="date"
                        label={$t('account.profile.birthday.label')}
                        value={birthday}
                        on:input={e => birthday = e.target.value}
                        on:focus={resetError}
                />
                <CheckboxField
                        bind:checked={subscribed}
                        name="subscribed"
                        label={$t("account.profile.subscribed.label")}
                        labelBeforeCheckbox
                />
            </div>
            {#if hasError}
                <div class="w-full flex items-center justify-center mt-2">
                    <p class="text-sm text-red-400">{$t("account.profile.update.failed")}</p>
                </div>
            {/if}
            <div class="w-full my-4 xl:mx-4 flex flex-col xl:flex-row justify-center items-center">
                <button type="submit" disabled={!isValid || loading} class="text-center w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">{$t(`account.profile.update.${loading ? "loading" : "submit"}`)}</button>
            </div>
        </Fieldset>
    </form>
{/if}