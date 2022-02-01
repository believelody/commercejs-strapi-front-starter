<script>
    import { t } from "$lib/i18n";
    import Star from "../star/Star.svelte";
    import { fullName } from "../../utils/user.util";
    import { baseUrl } from "../../utils/url.util";

    export let reviews;
</script>

<style>
    /* your styles go here */
</style>

<ul class="w-full divide-y p-1">
    {#each reviews as review}
        <li class="border rounded shadow-md">
            <h3 class="flex justify-between border-b flex items-center p-2">
                <span class="text-lg font-medium">{fullName(review.user.customer)}</span>
                <Star nb={review.ratings} />
            </h3>
            <p class="border-b p-2">{review.description}</p>
            <ul class="flex flex-wrap py-2">
                {#each review.images as image}
                    <li class="flex flex-col mx-2 border">
                        <img
                            class="w-24 h-24 object-cover"
                            src={`${baseUrl}${image.url}`}
                            alt={image.name}
                        />
                    </li>
                {/each}
            </ul>
        </li>
    {:else}
        <section>{$t("review.product.list.empty")}</section>
    {/each}
</ul>