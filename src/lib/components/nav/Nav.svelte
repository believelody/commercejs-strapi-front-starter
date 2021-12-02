<script>
	import { t } from '$lib/i18n';
</script>

<nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
	<a
		href="/categories/transport"
		class="mr-5 hover:border-b hover:border-gray-900 hover:text-gray-900 cursor-pointer"
	>
		{$t('menu.transport')}
	</a>
	<a href="/categories/jeu" class="mr-5 hover:text-gray-900 cursor-pointer">{$t('menu.game')}</a>
	<a href="/categories/soin-esthetique" class="mr-5 hover:text-gray-900 cursor-pointer">
		{$t('menu.caring')}
	</a>
	<a href="/about" class="mr-5 hover:text-gray-900 cursor-pointer">{$t('menu.about')}</a>
	<a href="/contact" class="mr-5 hover:text-gray-900 cursor-pointer">{$t('menu.contact')}</a>
</nav>
