<script>
    import { sidebar } from "$lib/stores";
    import MenuIcon from "$lib/elements/icon/MenuIcon.svelte";
    import MenuSidebar from "../sidebars/MenuSidebar.svelte";
    import IconButton from "../../elements/button/IconButton.svelte";

    function openSidebarMenu() {
        $sidebar = {
            component: MenuSidebar,
            openFrom: "left",
            noCloseBtn: true
        };
    }
</script>

<IconButton
    on:click={openSidebarMenu}
    class="bg-transparent"
    icon={MenuIcon}
    strokeWidth={2}
/>