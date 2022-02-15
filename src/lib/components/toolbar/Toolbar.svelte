<script>
    import CartNav from "../nav/CartNav.svelte";
    import SearchProducts from "../products/SearchProducts.svelte";
    import MenuButton from "../buttons/MenuButton.svelte";
    import Logo from "$lib/elements/logo/Logo.svelte";
    import AuthNav from "../nav/AuthNav.svelte";
</script>

<section class="bg-indigo-500 grid grid-cols-5 md:hidden justify-center h-20">
    <MenuButton />
    <SearchProducts />
    <a href="/">
        <Logo />
    </a>
    <CartNav />
    <AuthNav />
</section>