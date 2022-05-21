import { progress } from "$lib/stores";
import { useLockModal } from "./modal.util";

export async function useProgress(cb) {
    try {
        progress.set(true);
        await cb()
    } finally {
        progress.set(false)
    }
}

export async function useProgressWithLockModal(cb) {
    try {
        progress.set(true);
        await useLockModal(cb);
    } finally {
        progress.set(false);
    }
}