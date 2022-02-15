<script>
    import { t } from "$lib/i18n";
    import HeaderTitle from "../header/HeaderTitle.svelte";
    import Box from "$lib/elements/box/Box.svelte";

    export let attributes;
</script>

<Box class="border rounded">
    <HeaderTitle textSize="2xl" title={$t("product.detail.characteristics")} />
    <ul class="flex flex-col lg:flex-row lg:justify-between lg:flex-wrap">
        {#each attributes as attribute}
            <li class="mb-2 w-full lg:w-1/2">
                <h3 class="text-md underline font-semibold">{attribute.name} :</h3>
                <section class="ml-4 flex flex-col">
                    {#each attribute.value.split(";") as value}
                        <span>{value}</span>
                    {/each}
                </section>
            </li>
        {/each}
    </ul>
</Box>