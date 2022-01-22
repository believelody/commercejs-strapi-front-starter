<script>
    import { t } from '$lib/i18n';    
    import Fields from "../field/Fields.svelte";
import FileField from '../field/FileField.svelte';
    import TextareaField from "../field/TextareaField.svelte";
import SelectStar from '../star/SelectStar.svelte';
import Star from '../star/Star.svelte';
    
    export let item, review, withoutShadow = false;
    let description = review?.description ?? "",
        images = review?.images ?? [],
        ratings = review?.ratings ?? 0,
        loading = false;

    function removeImg(index) {
        images = images.filter((_, i) => i !== index);
    }

    async function submit() {}

    $: isValid = !!(description && ratings);
</script>

<style>
    /* your styles go here */
</style>

<section class="w-full flex flex-col p-2 mb-2 border">
    <span class="text-lg text-gray-800">{item.product_name}</span>
    {#each item.variants as variant}
        <span class="text-md text-gray-600">{variant.variant_name} : {variant.option_name}</span>
    {/each}
</section>
<form on:submit|preventDefault={submit}>
    <Fields class="flex flex-col" {withoutShadow}>
        <section class="flex items-center my-2">
            <span class="mr-4">{$t("review.ratings")} *</span>
            <SelectStar bind:value={ratings} class="border p-2 rounded" />
        </section>
        <TextareaField
            label={$t("common.description.label")}
            name="description"
            class="w-full"
            placeholder={$t("common.description.placeholder")}
            bind:value={description}
            required
        />
        <section>
            <FileField
                label={$t("review.modal.images")}
                name="images"
                on:load={({ detail }) => images = [...images, ...detail.files]}
                multiple
                accept=".jpg, .jpeg, .png"
            />
        </section>
        {#if images.length}
            <ul class="flex flex-wrap px-2">
                {#each images as image, index}
                    <li class="mx-2 flex flex-col">
                        <img class="w-32 h-32 object-cover" src={URL.createObjectURL(image)} alt={image.name} />
                        <button on:click={() => removeImg(index)}>{$t("common.delete")}</button>
                    </li>
                {/each}
            </ul>
        {/if}
        <div class="w-auto my-2 xl:mx-4 flex flex-col xl:flex-row justify-center items-center">
            <button disabled={!isValid} class="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 rounded disabled:opacity-75 disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed">{$t("common.confirm")}</button>
        </div>
    </Fields>
</form>