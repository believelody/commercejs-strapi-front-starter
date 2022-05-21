import { modal } from "$lib/elements/modal/Modal.svelte";
import { media } from "$lib/stores";
import { get } from "svelte/store";

const $media = get(media);

export const fullOpacityBackground = {
    styleBg: {
        backgroundColor: 'rgba(32, 32, 32, 1)'
    },
    styleWindow: {
        width: $media.mobile ? '100%' : '80%',
        margin: '0 auto'
    }
}

export const darkBackground = {
    styleBg: {
        backgroundColor: "rgba(0, 0, 0, .9)",
    },
    styleWindow: {
        width: $media.mobile ? "100%" : "80%",
        margin: "0 auto"
    }
}

export async function useLockModal(cb) {
    try {
        modal.disableCloseModal();
        await cb();
    } finally {
        modal.resetModalCloseOptions();
    }
}