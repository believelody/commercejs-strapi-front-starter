<script>
    import { getContext } from "svelte";
    import { t } from "$lib/i18n";
    import Star from "../star/Star.svelte";
    import { fullName } from "../../utils/user.util";
    import { baseUrl } from "../../utils/url.util";
    import { localDateFromString } from "../../utils/date.util";
import ReviewImageViewerModal from "../modal/ReviewImageViewerModal.svelte";

    export let reviews;
    const { open } = getContext("simple-modal");

    function openReviewViewerModal(index, review) {
        open(ReviewImageViewerModal, {
            images: review.images.map(image => ({
                ...image,
                url: `${baseUrl}${image.url}`
            })),
            selectedIndex: index
        })
    }
</script>

<style>
    /* your styles go here */
</style>

<ul class="w-full divide-y p-1">
    {#each reviews as review}
        <li class="bg-gray-100 border rounded shadow-md">
            <h3 class="flex justify-between items-center border-b border-white flex items-center p-2">
                <div class="flex items-center">
                    <span class="text-lg font-medium mr-8">{fullName(review.user.customer)}</span>
                    <Star nb={review.ratings} />
                </div>
                <div>
                    <span>{localDateFromString(review.created_at)}</span>
                </div>
            </h3>
            <p class="border-b border-white p-2 italic">&lt;&lt; {review.description} &gt;&gt;</p>
            <ul class="flex flex-wrap py-2">
                {#each review.images as image, index}
                    <li class="flex flex-col mx-2">
                        <img
                            class="w-24 h-24 object-cover cursor-pointer"
                            src={`${baseUrl}${image.url}`}
                            alt={image.name}
                            on:click={() => openReviewViewerModal(index, review)}
                        />
                    </li>
                {/each}
            </ul>
        </li>
    {:else}
        <section>{$t("review.product.list.empty")}</section>
    {/each}
</ul>