<script>
	import { t } from '$lib/i18n';
</script>

<nav class="extra-links-list">
    <a href="/faq" class="extra-links-item btn-link text-neutral-dark hover:text-neutral">{$t('footer.links.faq')}</a>
    <a href="/contact" class="extra-links-item btn-link text-neutral-dark hover:text-neutral">{$t('footer.links.contact')}</a>
    <a href="/tou" class="extra-links-item btn-link text-neutral-dark hover:text-neutral">{$t('footer.links.tou')}</a>
    <a href="/legal-notice" class="extra-links-item btn-link text-neutral-dark hover:text-neutral">{$t('footer.links.legal-notice')}</a>
</nav>

<style>
	@import "../../../styles/tailwind.css";
    
	.extra-links-list {
        @apply list-none w-auto grid grid-cols-1 divide-y md:divide-y-0 border-b md:border-b-0;
    }

    .extra-links-item {
        @apply p-2 text-center md:text-left;
    }
</style>