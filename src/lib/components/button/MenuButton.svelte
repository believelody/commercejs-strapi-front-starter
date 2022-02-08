<script>
    import { sidebar } from "$lib/stores";
    import MenuIcon from "../svg/MenuIcon.svelte";
    import MenuSidebar from "../sidebar/MenuSidebar.svelte";

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