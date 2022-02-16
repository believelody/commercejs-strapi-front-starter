<script>
    import { t } from "$lib/i18n";
    import SidebarWrapper from "../../elements/sidebar/SidebarWrapper.svelte";
    import MenuProfile from "../profile/MenuProfile.svelte";
</script>

<style>
    /* your styles go here */
</style>

<SidebarWrapper class="w-80">
    <h3 slot="header" class="py-2 font-medium text-center">{$t("account.sidebar.title")}</h3>
    <MenuProfile slot="content" />
</SidebarWrapper>