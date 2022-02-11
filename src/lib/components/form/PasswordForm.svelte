<script>
    import { getNotificationsContext } from 'svelte-notifications';
    import api from '$lib/api';
    import { t } from '$lib/i18n';
    import Fields from '../field/Fields.svelte';
    import InputField from '../field/InputField.svelte';

    let password = "", newPassword = "", hasError = false, loading = false, isValid = false;
    const { addNotification } = getNotificationsContext();

    async function submit() {
        loading = true;
        const res = await api.user.updatePassword(password, newPassword);
        console.log(res);
        if (res.success) {
            addNotification({
                position: 'top-left',
                heading: $t(`notifications.password.heading`),
                text: $t(`notifications.password.description`),
                description: $t(`notifications.password.description`),
                type: 'success',
                removeAfter: 5000
            });
            password = newPassword = "";
            isValid = false;
        } else {
            hasError = true;
        }
        loading = false;
    }

    function resetError() {
        hasError = false;
    }

    $: isValid = !!(password && newPassword && newPassword !== password);
</script>

<style>
    /* your styles go here */
</style>

<form on:submit|preventDefault={submit}>
    <Fields class="flex flex-col border-2 border-red-400 bg-red-100">
        <InputField
            name="password"
            type="password"
            label={$t('account.profile.password.label')}
            placeholder={$t('account.profile.password.placeholder')}
            value={password}
            on:input={e => password = e.target.value}
            on:focus={resetError}
        />
        <InputField
            name="newPassword"
            type="password"
            label={$t('account.profile.new-password.label')}
            placeholder={$t('account.profile.new-password.placeholder')}
            value={newPassword}
            on:input={e => newPassword = e.target.value}
            on:focus={resetError}
        />
        {#if hasError}
            <div class="w-full flex items-center justify-center mt-2">
                <p class="text-sm text-red-400">{$t("account.profile.update-password.failed")}</p>
            </div>
        {/if}
        <div class="w-full my-4 xl:mx-4 flex justify-center items-center">
            <button
                type="submit"
                disabled={!isValid || loading} class="text-center w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 disabled:bg-gray-500 disabled:cursor-not-allowed">{$t(`account.profile.update-password.${loading ? "loading" : "submit"}`)}</button>
        </div>
    </Fields>
</form>