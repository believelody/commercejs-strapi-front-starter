<script>
	import { t } from '$lib/i18n';
	import HeaderTitle from '../header/HeaderTitle.svelte';

	export let attributes;
</script>

<HeaderTitle textSize="2xl" title={$t('product.detail.characteristics')} />
<ul class="grid grid-cols-2 gap-4">
	{#each attributes as attribute}
		<li class="mb-2 w-full">
			<h3 class="text-md underline font-semibold">{attribute.name} :</h3>
			<section class="ml-4 flex flex-col">
				{#each attribute.value.split(';') as value}
					<span>{value}</span>
				{/each}
			</section>
		</li>
	{/each}
</ul>
