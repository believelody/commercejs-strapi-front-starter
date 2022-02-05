<script>
    import { getContext } from "svelte";
    import { t } from "$lib/i18n";
    import { media } from "$lib/stores";
    import Star from "../star/Star.svelte";
    import ReviewImageViewerModal from "../modal/ReviewImageViewerModal.svelte";
    import { fullName } from "../../utils/user.util";
    import { localDateFromString } from "../../utils/date.util";

    export let reviews;
    const { open } = getContext("simple-modal");

    function openReviewViewerModal(index, review) {
        open(ReviewImageViewerModal, {
            images: review.images,
            selectedIndex: index
        }, {
            styleBg: {
                backgroundColor: "rgba(0, 0, 0, .9)",
            },
            styleWindow: {
                width: $media.mobile ? "100%" : "80%",
                margin: "0 auto"
            }
        })
    }
</script>

<style>
    /* your styles go here */
</style>

<ul class="w-full p-1 divide-y">
    {#each reviews as review}
        <li class="bg-gray-100 border rounded shadow-md">
            <h3 class="flex items-center justify-between p-2 border-b border-gray-300">
                <div class="flex items-center">
                    <span class="mr-8 text-lg font-medium">{fullName(review.user.customer)}</span>
                    <Star nb={review.ratings} />
                </div>
                <div>
                    <span>{localDateFromString(review.created_at)}</span>
                </div>
            </h3>
            <p class="p-2 italic">&lt;&lt; {review.description} &gt;&gt;</p>
            {#if review.images.length}
                <ul class="flex flex-wrap justify-start py-2 border-t border-gray-300">
                    {#each review.images as image, index}
                        <li class="flex flex-col m-1">
                            <img
                                class="object-cover w-24 h-24 cursor-pointer"
                                src={`${image.url}`}
                                alt={image.name}
                                on:click={() => openReviewViewerModal(index, review)}
                            />
                        </li>
                    {/each}
                </ul>
            {/if}
        </li>
    {:else}
        <section>{$t("review.product.list.empty")}</section>
    {/each}
</ul>