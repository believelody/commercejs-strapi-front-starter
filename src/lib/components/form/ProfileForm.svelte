<script>
    import { getNotificationsContext } from 'svelte-notifications';
    import api from '$lib/api';
    import {t} from '$lib/i18n';
    import {profile} from '$lib/stores';
    import Fields from '../field/Fields.svelte';
    import InputField from '../field/InputField.svelte';
    import {clickLinkOutside} from "../../actions/clickOutside";
    import {onMount} from "svelte";
    import CheckboxField from "../field/CheckboxField.svelte";
    import {emailValidation} from "../../utils/form.util";

    let firstname, lastname, birthday, email, subscribed, hasError = false, loading, isDraft = false;
    const { addNotification } = getNotificationsContext();

    async function submit() {
        loading = true;
        let isValid = false;
        let username = "";
        let customerData = {};
        let userData = {};
        if (firstname) {
            customerData.firstname = firstname;
            username = firstname.toLowerCase().split(" ").join("-");
        }
        if (lastname) {
            customerData.lastname = lastname;
            lastname.toLowerCase().split(" ").forEach(word => {
                username = username.concat("-", word);
            });
        }
        if (birthday) {
            customerData.meta = { ...$profile.customer.meta, birthday };
        }
        if (username) {
            userData.username = username;
        }
        if (email) {
            userData.email = email;
        }
        userData.subscribed = subscribed;
        const res = await api.user.update({
            customerData, userData
        });
        if (res.success) {
            addNotification({
                position: 'top-left',
                heading: $t(`notifications.profile.heading`),
                text: $t(`notifications.profile.description`),
                description: $t(`notifications.profile.description`),
                type: 'success',
                removeAfter: 5000
            });
            isValid = false;
            isDraft = false;
        } else {
            hasError = true;
        }
        loading = false;
    }

    function resetError() {
        hasError = false;
    }

    onMount(() => {
        if ($profile) {
            firstname = $profile.customer.firstname;
            lastname = $profile.customer.lastname;
            birthday = $profile.customer.meta.birthday;
            email = $profile.email;
            subscribed = $profile.subscribed;
        }

        return () => isDraft = false;
    });

    $: isDraft = firstname !== $profile?.customer.firstname || lastname !== $profile?.customer.lastname || email !== $profile?.email || birthday !== $profile?.customer.meta.birthday || subscribed !== $profile?.subscribed;
    $: isValid = !!(firstname && email && emailValidation(email)) && isDraft;
</script>

<style>
    * {
        box-sizing: border-box;
    }
</style>

<form use:clickLinkOutside={{ isDraft, text: $t("account.profile.draft.confirm") }} on:clicklinkoutside={() => isDraft = false} id="profile-form" on:submit|preventDefault={submit}>
    <Fields class="flex flex-col">
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
                class="py-2"
                label={$t("account.profile.subscribed.label")}
                labelBeforeCheckbox
        />
        {#if hasError}
            <div class="w-full flex items-center justify-center mt-2">
                <p class="text-sm text-red-400">{$t("account.profile.update.failed")}</p>
            </div>
        {/if}
        <div class="w-full my-4 xl:mx-4 flex justify-center items-center">
            <button type="submit" disabled={!isValid || loading} class="text-center text-white w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed">{$t(`account.profile.update.${loading ? "loading" : "submit"}`)}</button>
        </div>
    </Fields>
</form>
