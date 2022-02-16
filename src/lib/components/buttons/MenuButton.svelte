<script>
    import MenuIcon from "$lib/elements/icon/MenuIcon.svelte";
    import MenuSidebar from "../sidebars/MenuSidebar.svelte";
    import IconButton from "../../elements/button/IconButton.svelte";
import { openSidebar } from "../../context/sidebar";

    function openSidebarMenu() {
        openSidebar({
            component: MenuSidebar,
            openFrom: "left",
        });
    }
</script>

<IconButton
    on:click={openSidebarMenu}
    class="bg-transparent"
    icon={MenuIcon}
    strokeWidth={2}
/>