import { get } from "svelte/store";
import { media } from "$lib/stores";
import AuthModal__SVelteComponent_ from "../components/modals/AuthModal.svelte";
import AddressModal__SvelteComponent_ from "../components/modals/AddressModal.svelte";
import ReviewImageViewerModal__SvelteComponent_ from "../components/modals/ReviewImageViewerModal.svelte";
import AddReviewModal__SvelteComponent_ from "../components/modals/AddReviewModal.svelte";
import ConfirmationEmailModal__SvelteComponent_ from "../components/modals/ConfirmationEmailModal.svelte";
import DangerModal__SvelteComponent_ from "../elements/modal/DangerModal.svelte";
import ImageModal__SvelteComponent_ from "../components/modals/ImageModal.svelte";
import InfoModal__SvelteComponent_ from "../elements/modal/InfoModal.svelte";
import ItemToCartSuccessModal__SvelteComponent_ from "../components/modals/ItemToCartSuccessModal.svelte";
import LoadingModal__SvelteComponent_ from "../components/modals/ItemToCartSuccessModal.svelte";
import OrderContactModal__SvelteComponent_ from "../components/modals/ItemToCartSuccessModal.svelte";
import RegisterSuccessModal__SvelteComponent_ from "../components/modals/RegisterSuccessModal.svelte";
import StripePaymentModal__SvelteComponent_ from "../components/modals/RegisterSuccessModal.svelte";
import DiscountSuccessModal__SvelteComponent_ from "../components/modals/DiscountSuccessModal.svelte";
import DiscountFailedModal__SvelteComponent_ from "../components/modals/DiscountFailedModal.svelte";

const $media = get(media);

export function openAuthModal(open, props, style) {
    open(AuthModal__SVelteComponent_, props, style);
}

export function openAddressModal(open, props = {}, style = {}) {
    open(AddressModal__SvelteComponent_, props, style);
}

export const openReviewViewerModal = (open, index, review) => {
    open(
        ReviewImageViewerModal__SvelteComponent_,
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

export function openAddReviewModal(open, item) {
    open(AddReviewModal__SvelteComponent_, { item }, {
        styleBg: {
            backgroundColor: "rgba(0, 0, 0, .9)",
        },
        styleWindow: {
            width: $media.mobile ? "100%" : "80%",
            margin: "0 auto"
        }
    });
}

export function openConfirmationEMailModal(open) {
    open(ConfirmationEmailModal__SvelteComponent_);
}

export function openDangerModal(open, props, style) {
    open(DangerModal__SvelteComponent_, props, style);
}

export function openImageModal(open, props, style) {
    open(ImageModal__SvelteComponent_, props, style);
}

export function openInfoModal(open, props, style) {
    open(InfoModal__SvelteComponent_, props, style);
}

export function openItemToCartSuccessModal(open, props, style) {
    open(ItemToCartSuccessModal__SvelteComponent_, props, style)
}

export function openLoadingModal(open, props, style) {
    open(LoadingModal__SvelteComponent_, props, style);
}

export function openOrderContactModal(open, props, style) {
    open(OrderContactModal__SvelteComponent_, props, style)
}

export function openRegisterSuccessModal(open, props, style) {
    open(RegisterSuccessModal__SvelteComponent_, props, style);
}

export function openStripePaymentModal(open, props, style) {
    open(StripePaymentModal__SvelteComponent_, props, style);
}

export function openDiscountModal(open, isCodeValid, props, style) {
    open(isCodeValid ? DiscountSuccessModal__SvelteComponent_ : DiscountFailedModal__SvelteComponent_, props, style);
}