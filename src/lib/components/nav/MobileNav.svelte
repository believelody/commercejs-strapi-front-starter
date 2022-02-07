<script>
    import CartNav from "../cart/CartNav.svelte";
    import SearchProducts from "../products/SearchProducts.svelte";
    import MenuButton from "../button/MenuButton.svelte";
    import Logo from "../display/Logo.svelte";
    import AuthNav from "./AuthNav.svelte";
</script>

<section class="bg-indigo-500 grid grid-cols-5 md:hidden">
    <MenuButton />
    <SearchProducts />
    <Logo />
    <CartNav />
    <AuthNav />
</section>