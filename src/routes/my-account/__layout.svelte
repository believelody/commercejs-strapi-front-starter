<script>
	import { page } from '$app/stores'
	import MenuProfile from '$components/profile/MenuProfile.svelte';

	$: console.log("layout my-account stuff : ", $page.stuff);
</script>

<div class="layout">
	<aside>
		<div class="aside-profile">
			<MenuProfile />
		</div>
	</aside>
	<article>
		<slot />
	</article>
</div>

<style>
	@import '../../app.css';

	.layout {
		@apply relative container mx-auto grid grid-rows-1 gap-4 grow lg:grow-0 lg:mt-4;
	}

	aside {
		@apply hidden relative lg:flex lg:flex-col lg:col-span-1;
	}

	.aside-profile {
		@apply sticky top-0 inset-x-0 border shadow-lg rounded;
	}

	article {
		@apply relative bg-primary-light-2 lg:col-start-2 lg:col-span-2 flex flex-col items-center rounded lg:shadow-lg pb-0 lg:pb-4;
	}
</style>
