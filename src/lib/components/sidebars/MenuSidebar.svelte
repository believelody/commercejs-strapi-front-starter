<script>
	import Brand from '$lib/elements/brand/Brand.svelte';
    import Footer from '../footer/Footer.svelte';
	import ExtraLinks from '../links/ExtraLinks.svelte';
	import MenuNav from '../nav/MenuNav.svelte';
	import SidebarWrapper from "../../elements/sidebar/SidebarWrapper.svelte";
</script>

<SidebarWrapper class="h-screen overflow-y-hidden">
	<h3 slot="header" class="py-4">
		<Brand />
	</h3>
	<div slot="content" class="flex-grow text-gray-700 overflow-y-auto border-t">
        <MenuNav />
		<ExtraLinks />
    </div>
    <Footer slot="extra" />
</SidebarWrapper>

<style>
	/* your styles go here */
</style>
