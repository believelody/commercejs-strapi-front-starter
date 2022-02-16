<script>
	import { t } from '$lib/i18n';
	import Accordion from '$lib/elements/accordion/Accordion.svelte';
	import Dropdown from '$lib/elements/dropdown/Dropdown.svelte';

	const links = [
		{ url: "/categories/transport", text: $t('menu.categories.transport.label') },
		{ url: "/categories/jeu", text: $t('menu.categories.game.label') },
		{ url: "/categories/soin-esthetique",  text: $t('menu.categories.caring.label') },
		{ url: "/categories", text: $t('menu.categories.all.label') }
	];
</script>

<section class="border-box border-b md:border-b-0 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 items-center divide-y md:divide-y-0">
    <div>
        <!-- Desktop and tablet -->
        <Dropdown class="hidden md:inline">
            <p slot="header" class="btn btn-link md:py-4">{$t("menu.categories.label")}</p>
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
        <Accordion class="md:hidden" iconSize={6}>
            <p slot="header" class="btn btn-link">{$t("menu.categories.label")}</p>
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
    <a href="/about" class="btn btn-link px-2 py-2 md:py-4 md:col-span-2 xl:col-span-1">{$t('menu.about.label')}</a>
    <a href="/blog" class="btn btn-link py-2 md:py-4">{$t('menu.blog.label')}</a>
</section>
