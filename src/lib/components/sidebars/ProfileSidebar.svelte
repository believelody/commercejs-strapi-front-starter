<script>
    import { t } from "$lib/i18n";
    import MenuProfile from "../profile/MenuProfile.svelte";
</script>

<style>
    /* your styles go here */
</style>

<div class="w-80">
    <h3 class="py-2 font-medium text-lg text-center">{$t("account.sidebar.title")}</h3>
    <MenuProfile />
</div>