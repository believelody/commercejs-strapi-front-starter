<script>
	import { t } from '$lib/i18n';
import Accordion from '../accordion/Accordion.svelte';
	import Dropdown from '../dropdown/Dropdown.svelte';
	import MenuIcon from '../svg/MenuIcon.svelte';

	const links = [
		{ url: "/categories/transport", text: $t('menu.categories.transport.label') },
		{ url: "/categories/jeu", text: $t('menu.categories.game.label') },
		{ url: "/categories/soin-esthetique",  text: $t('menu.categories.caring.label') },
		{ url: "/categories", text: $t('menu.categories.all.label') }
	];
</script>

<Dropdown class="hidden md:inline mr-4">
	<h4 slot="header" class="relative">{$t("menu.categories.label")}</h4>
	<nav slot="content" class="w-36 border-2 rounded bg-gray-100 grid grid-rows-4 divide-y">
		{#each links as item}
			<a
				href={item.url}
				class="px-2 py-auto flex flex-grow items-center hover:text-gray-900 cursor-pointer"
			>
				{item.text}
			</a>
			{/each}
	</nav>
</Dropdown>

<Accordion class="hidden md:inline mr-4">
	<h4 slot="header" class="relative">{$t("menu.categories.label")}</h4>
	<nav slot="content" class="w-36 border-2 rounded bg-gray-100 grid grid-rows-4 divide-y">
		{#each links as item}
			<a
				href={item.url}
				class="px-2 py-auto flex flex-grow items-center hover:text-gray-900 cursor-pointer"
			>
				{item.text}
			</a>
			{/each}
	</nav>
</Accordion>