<script>
	import { t } from '$lib/i18n';
import LinkButton from '../../elements/button/LinkButton.svelte';
</script>

<nav class="list-none grid grid-cols-1 divide-y md:divide-y-0 border-b md:border-b-0">
    <LinkButton underlinedOnHover class="hover:font-medium">
        <a href="/faq" class="text-neutral-dark hover:text-gray-800">{$t('footer.links.faq')}</a>
    </LinkButton>
    <LinkButton underlinedOnHover class="hover:font-medium">
        <a href="/contact" class="text-neutral-dark hover:text-gray-800">{$t('footer.links.contact')}</a>
    </LinkButton>
    <LinkButton underlinedOnHover class="hover:font-medium">
        <a href="/tou" class="text-neutral-dark hover:text-gray-800">{$t('footer.links.tou')}</a>
    </LinkButton>
    <LinkButton underlinedOnHover class="hover:font-medium">
		<a href="/legal-notice" class="text-neutral-dark hover:text-gray-800">{$t('footer.links.legal-notice')}</a>
	</LinkButton>
</nav>

<style>
	/* your styles go here */
</style>
