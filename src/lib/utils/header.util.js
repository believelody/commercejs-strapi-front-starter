import { get } from "svelte/store";
import { jwt } from "../stores";

export const authenticateHeaders = () => {
    if (get(jwt)) {
        return {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${get(jwt)}`
        }
    }
    return {
        "Content-Type": "application/json",
    };
};

export const headers = {
    "Content-Type": "application/json",
}