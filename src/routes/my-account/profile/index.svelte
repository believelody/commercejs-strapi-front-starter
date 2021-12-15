<script>
    import { t } from '$lib/i18n';
    import ProfileForm from "../../../lib/components/form/ProfileForm.svelte";
    import HeaderTitle from "../../../lib/components/header/HeaderTitle.svelte";
</script>

<HeaderTitle title={$t("account.profile.title")} />
<div class="w-full lg:w-4/5">
    <ProfileForm />
</div>