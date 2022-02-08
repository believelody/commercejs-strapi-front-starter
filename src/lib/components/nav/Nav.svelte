<script>
	import { t } from '$lib/i18n';
	import Accordion from '../accordion/Accordion.svelte';
	import Dropdown from '../dropdown/Dropdown.svelte';

	const links = [
		{ url: "/categories/transport", text: $t('menu.categories.transport.label') },
		{ url: "/categories/jeu", text: $t('menu.categories.game.label') },
		{ url: "/categories/soin-esthetique",  text: $t('menu.categories.caring.label') },
		{ url: "/categories", text: $t('menu.categories.all.label') }
	];
</script>

<section class="border-box border-b md:border-b-0 flex flex-col md:flex-row md:flex-grow md:px-2 items-center divide-y md:divide-y-0">
	<div class="w-full">
		<!-- Desktop and tablet -->
		<Dropdown class="hidden md:inline">
			<h4 slot="header" class="w-full text-center">{$t("menu.categories.label")}</h4>
			<nav slot="content" class="w-36 border-2 rounded bg-gray-100 grid grid-rows-4 divide-y">
				{#each links as item}
					<a
						href={item.url}
						class="p-2 flex flex-grow items-center hover:text-gray-900 cursor-pointer"
					>
						{item.text}
					</a>
					{/each}
			</nav>
		</Dropdown>
		<!-- Mobile -->
		<Accordion class="w-full md:hidden" iconSize={6}>
			<h4 slot="header">{$t("menu.categories.label")}</h4>
			<nav slot="content" class="w-full grid grid-cols-1 divide-y">
				{#each links as item}
					<a
						href={item.url}
						class="p-2 hover:text-gray-900 cursor-pointer"
					>
						{item.text}
					</a>
					{/each}
			</nav>
		</Accordion>
	</div>
	<a href="/about" class="w-full py-2 text-center md:px-2 hover:text-gray-900 cursor-pointer">{$t('menu.about.label')}</a>
	<a href="/blog" class="w-full py-2 text-center hover:text-gray-900 cursor-pointer">{$t('menu.blog.label')}</a>
</section>
