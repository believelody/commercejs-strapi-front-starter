<script>
    import {onMount} from "svelte";
    import { getNotificationsContext } from 'svelte-notifications';
    import api from '$lib/api';
    import {t} from '$lib/i18n';
    import {profile} from '$lib/stores';
    import Fields from '$lib/elements/form/Form.svelte';
    import TextInput from '$lib/elements/inputs/TextInput.svelte';
    import {clickLinkOutside} from "../../actions/clickOutside";
    import Checkbox from "$lib/elements/inputs/Checkbox.svelte";
    import {emailValidation} from "../../utils/form.util";
import Form from "$lib/elements/form/Form.svelte";
import PrimaryButton from "$lib/elements/button/PrimaryButton.svelte";

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

<div use:clickLinkOutside={{ isDraft, text: $t("account.profile.draft.confirm") }} on:clicklinkoutside={() => isDraft = false}>
    <Form id="profile-form" {submit}>
        <div slot="content" class="p-2 grid gid-cols-1 gap-4">
            <TextInput
                    name="firstname"
                    label={$t('identity.firstname.label')}
                    placeholder={$t('identity.firstname.placeholder')}
                    value={firstname}
                    on:input={e => firstname = e.target.value}
                    on:focus={resetError}
                    required
            />
            <TextInput
                    name="lastname"
                    label={$t('identity.lastname.label')}
                    placeholder={$t('identity.lastname.placeholder')}
                    value={lastname}
                    on:input={e => lastname = e.target.value}
                    on:focus={resetError}
                    required
            />
            <TextInput
                    name="email"
                    type="email"
                    label={$t('identity.email.label')}
                    placeholder={$t('identity.email.placeholder')}
                    value={email}
                    on:input={e => email = e.target.value}
                    on:focus={resetError}
                    required
            />
            <TextInput
                    name="birthday"
                    type="date"
                    label={$t('account.profile.birthday.label')}
                    value={birthday}
                    on:input={e => birthday = e.target.value}
                    on:focus={resetError}
            />
            <Checkbox
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
            <div class="flex-center-middle">
                <PrimaryButton disabled={!isValid || loading}>{$t(`account.profile.update.${loading ? "loading" : "submit"}`)}</PrimaryButton>
            </div>
        </div>
    </Form>
</div>