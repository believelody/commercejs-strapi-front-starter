<script>
    import { t } from "$lib/i18n";
    import SidebarWrapper from "../../elements/sidebar/SidebarWrapper.svelte";
    import MenuProfile from "../profile/MenuProfile.svelte";
</script>

<style>
    /* your styles go here */
</style>

<SidebarWrapper class="md:w-80">
    <h3 slot="header" class="box-border w-full pl-2 pr-14 py-2 font-medium">{$t("account.sidebar.title")}</h3>
    <MenuProfile slot="content" />
</SidebarWrapper>