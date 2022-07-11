<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import api from '$api';
	import { t } from '$lib/i18n';
	import { categories } from '$lib/stores';
	import Accordion from '$elements/accordion/Accordion.svelte';
	import Dropdown from '$elements/dropdown/Dropdown.svelte';
	import CategoriesNav from './CategoriesNav.svelte';

	let meta;

	async function getCategories() {
		const res = await api.category.getOneBySlug('pets');
		if (res.error) {
		}
		$categories = res.category.children;
		meta = res.category.meta;
	}

	onMount(async () => {
		if (!$categories.length) {
			getCategories();
		}
	});
</script>

<section class="navigation">
	<div class="link link-categories">
		<!-- Desktop and tablet -->
		<Dropdown class="hidden md:inline">
			<p slot="header" class:active={$page.url.pathname.includes('categories')} class="underline">
				{$t('menu.categories.label')}
			</p>
			<CategoriesNav categories={$categories} {meta} slot="content" />
		</Dropdown>
		<!-- Mobile -->
		<Accordion
			class="md:hidden w-full"
			iconSize={6}
			timing="easy-in"
		>
			<p slot="header">{$t('menu.categories.label')}</p>
			<CategoriesNav categories={$categories} {meta} slot="content" />
		</Accordion>
	</div>
	<a sveltekit:prefetch class:active={$page.url.pathname === '/about'} href="/about" class="link link-about">{$t('menu.about.label')}</a>
	<a sveltekit:prefetch class:active={$page.url.pathname === '/blog'} href="/blog" class="link link-blog">{$t('menu.blog.label')}</a>
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

	.link-about {
		@apply py-2 md:py-4 md:col-span-2;
	}

	.link-blog {
		@apply py-2 md:py-4 md:col-auto;
	}
</style>