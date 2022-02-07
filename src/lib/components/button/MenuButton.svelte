<script>
    import MenuIcon from "../svg/MenuIcon.svelte";

    function openSidebarMenu() {
        
    }
</script>

<style>
    /* your styles go here */
</style>

<button class="flex justify-center items-center w-full" on:click={openSidebarMenu}>
    <MenuIcon strokeWidth={2} />
</button>