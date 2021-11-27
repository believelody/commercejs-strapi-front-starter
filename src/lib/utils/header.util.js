import { get } from "svelte/store";
import { jwt } from "../stores";

export const authenticateHeaders = () => {
    const headers = {
        "Content-Type": "application/json",
    }
    if (get(jwt)) {
        headers["Authorization"] = `Bearer ${get(jwt)}`
    }
    return headers;
};

export const headers = {
    "Content-Type": "application/json",
}