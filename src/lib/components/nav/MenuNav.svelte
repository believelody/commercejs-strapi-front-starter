<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import api from '$lib/api';
	import { t } from '$lib/i18n';
	import Accordion from '$lib/elements/accordion/Accordion.svelte';
	import Dropdown from '$lib/elements/dropdown/Dropdown.svelte';

	let categories, meta;

	const links = [
		{ url: '/categories/transport', text: $t('menu.categories.transport.label') },
		{ url: '/categories/jeu', text: $t('menu.categories.game.label') },
		{ url: '/categories/soin-esthetique', text: $t('menu.categories.caring.label') },
		{ url: '/products', text: $t('menu.categories.all.label') }
	];

	async function getCategories() {
		const res = await api.category.getOneBySlug('pets');
		if (res.error) {
		}
		console.log(res);
		categories = res.category.children;
	}

	onMount(async () => {
		if (!categories) {
			getCategories();
		}
	});
</script>

<section class="navigation">
	<div class:active={$page.url.pathname.includes('categories')} class="link link-categories">
		<!-- Desktop and tablet -->
		<Dropdown class="hidden md:inline">
			<p slot="header" class="h-full">{$t('menu.categories.label')}</p>
			<nav slot="content" class="w-36 border-2 rounded bg-gray-100 grid grid-cols-1 divide-y">
				{#each categories as item}
					<a
						href={item.slug}
						class="nav-a"
					>
						{item.name}
					</a>
				{/each}
                <a href="/products" class="nav-a">
					{$t('menu.categories.all.label')}
				</a>
			</nav>
		</Dropdown>
		<!-- Mobile -->
		<Accordion class="md:hidden w-full" iconSize={6}>
			<p slot="header">{$t('menu.categories.label')}</p>
			<nav slot="content" class="link-categories-nav">
				{#each categories as item}
					<a href={item.slug} class="nav-a">
						{item.name}
					</a>
				{/each}
				<a href="/products" class="nav-a">
					{$t('menu.categories.all.label')}
				</a>
			</nav>
		</Accordion>
	</div>
	<a class:active={$page.url.pathname === '/about'} href="/about" class="link link-about"
		>{$t('menu.about.label')}</a
	>
	<a class:active={$page.url.pathname === '/blog'} href="/blog" class="link link-blog"
		>{$t('menu.blog.label')}</a
	>
</section>

<style>
	@import '../../../styles/tailwind.css';

	.navigation {
		@apply box-border border-b md:border-b-0 grid grid-cols-1 md:grid-cols-5 items-center divide-y md:divide-y-0;
	}

	.link {
		@apply text-center btn-link xl:px-2 md:underline;
	}

	.active {
		@apply no-underline;
	}

	.link-categories {
		@apply md:py-4 md:col-span-2 focus:bg-none;
	}

	.link-categories-nav {
		@apply w-full grid grid-cols-1 bg-white text-left divide-y text-neutral-dark;
	}

    .nav-a {
        @apply p-2 text-left bg-white flex items-center;
    }

	.link-about {
		@apply py-2 md:py-4 md:col-span-2;
	}

	.link-blog {
		@apply py-2 md:py-4 md:col-auto;
	}
</style>
