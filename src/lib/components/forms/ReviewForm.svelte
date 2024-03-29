<script>
    import {createEventDispatcher} from 'svelte';
    import api from "$api";
    import {t} from '$lib/i18n';
    import File from '$elements/input/FileInput.svelte';
    import TextareaInput from "$elements/input/TextareaInput.svelte";
    import SelectStar from '../stars/SelectStar.svelte';
    import Form from '$elements/form/Form.svelte';

    export let item, review, withoutShadow = false;
    let description = review?.description ?? "",
        images = review?.images ?? [],
        ratings = review?.ratings ?? 0,
        loading = false,
        error = "";
    const dispatch = createEventDispatcher();

    function removeImg(index) {
        images = images.filter((_, i) => i !== index);
    }

    async function submit() {
        loading = true;
        const res = await api.review.create(item.product_id, description, ratings, images);
        if (res.success) {
            dispatch("submitEvent");
            notifications.success({
                title: $t(`notifications.review.title`),
                message: $t(`notifications.review.message.success`),
            });
        } else {
            error = $t(`notifications.review.message.failure`);
        }
        loading = false;
    }
    $: isValid = !!ratings;
</script>

<style>
    /* your styles go here */
</style>

<section class="w-full flex flex-col p-2 mb-2 border">
    <span class="text-lg text-neutral-800">{item.product_name}</span>
    {#each item.variants as variant}
        <span class="text-md text-neutral-dark">{variant.variant_name} : {variant.option_name}</span>
    {/each}
</section>
<Form on:submit{submit} {withoutShadow}>
    <svelte:fragment slot="content">
        <section class="flex items-center my-2">
            <span class="mr-4">{$t("review.ratings.form.label")} *</span>
            <SelectStar bind:value={ratings} class="border p-2 rounded" />
        </section>
        <TextareaInput
                label={$t("common.description.label")}
                name="description"
                class="w-full"
                placeholder={$t("common.description.placeholder")}
                bind:value={description}
                required
        />
        <section>
            <File
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
            <button disabled={!isValid || loading} class="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 rounded disabled:opacity-75 disabled:bg-neutral-400 disabled:text-black disabled:cursor-not-allowed">{$t("common.confirm")}</button>
        </div>
        {#if error}
            <span class="text-red-500">{error}</span>
        {/if}
    </svelte:fragment>
</Form>