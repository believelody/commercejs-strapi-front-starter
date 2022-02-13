<script>
    import { sidebar } from "$lib/stores";
    import MenuIcon from "../../elements/icon/MenuIcon.svelte";
    import MenuSidebar from "../sidebars/MenuSidebar.svelte";

    function openSidebarMenu() {
        $sidebar = {
            component: MenuSidebar,
            openFrom: "left",
            noCloseBtn: true
        };
    }
</script>

<button class="flex justify-center items-center w-full" on:click={openSidebarMenu}>
    <MenuIcon strokeWidth={2} />
</button>