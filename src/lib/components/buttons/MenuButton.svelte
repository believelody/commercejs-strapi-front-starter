<script>
    import MenuIcon from "$elements/icon/MenuIcon.svelte";
    import MenuSidebar from "../sidebars/MenuSidebar.svelte";
    import IconButton from "$elements/button/IconButton.svelte";
import { openSidebar } from "$elements/sidebar/Sidebar.svelte";

    function openSidebarMenu() {
        openSidebar({
            component: MenuSidebar,
            options: { openFrom: "left" },
        });
    }
</script>

<IconButton
    on:click={openSidebarMenu}
    class="bg-transparent"
    icon={MenuIcon}
    strokeWidth={2}
/>