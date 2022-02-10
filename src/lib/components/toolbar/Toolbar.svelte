<script>
    import CartNav from "../cart/CartNav.svelte";
    import SearchProducts from "../products/SearchProducts.svelte";
    import MenuButton from "../button/MenuButton.svelte";
    import Logo from "../logo/Logo.svelte";
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