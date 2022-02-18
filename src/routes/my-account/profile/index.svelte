<script>
    import { t } from '$lib/i18n';
    import PasswordForm from '../../../lib/components/forms/PasswordForm.svelte';
    import ProfileForm from "../../../lib/components/forms/ProfileForm.svelte";
    import HeaderTitle from "../../../lib/components/header/HeaderTitle.svelte";
</script>

<HeaderTitle title={$t("account.profile.title")} />
<div class="w-full md:w-3/4 md:mx-auto grid grid-cols-1 gap-4 mb-4">
    <ProfileForm />
    <PasswordForm />
</div>