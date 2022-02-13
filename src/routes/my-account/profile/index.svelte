<script>
    import { t } from '$lib/i18n';
    import PasswordForm from '../../../lib/components/forms/PasswordForm.svelte';
    import ProfileForm from "../../../lib/components/forms/ProfileForm.svelte";
    import HeaderTitle from "../../../lib/components/header/HeaderTitle.svelte";
</script>

<HeaderTitle title={$t("account.profile.title")} />
<div class="grid grid-cols-1 gap-4 mb-4">
    <ProfileForm />
    <PasswordForm />
</div>