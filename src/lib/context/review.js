import { get } from "svelte/store";
import { media } from "$lib/stores";
import ReviewImageViewerModal from "../components/modal/ReviewImageViewerModal.svelte";
import AddReviewModal from "../components/modal/AddReviewModal.svelte";

const $media = get(media);

export const openReviewViewerModal = (open, index, review) => {
    open(
        ReviewImageViewerModal,
        {
            images: review.images,
            selectedIndex: index
        },
        {
            styleBg: {
                backgroundColor: 'rgba(32, 32, 32, 1)'
            },
            styleWindow: {
                width: $media.mobile ? '100%' : '80%',
                margin: '0 auto'
            }
        }
    );
}

export const openReviewModal = (open, item) => {
    open(AddReviewModal, { item }, {
        styleBg: {
            backgroundColor: "rgba(0, 0, 0, .9)",
        },
        styleWindow: {
            width: $media.mobile ? "100%" : "80%",
            margin: "0 auto"
        }
    });
}