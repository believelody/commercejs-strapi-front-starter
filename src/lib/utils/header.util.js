import { get } from "svelte/store";
import { jwt } from "../stores";

export const authenticateHeaders = () => {
    if (get(jwt) && window) {
        return {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${get(jwt)}`
        }
    }
    return {
        "Content-Type": "application/json",
    };
};

export const authorizationHeaders = () => {
    if (get(jwt) && window) {
        return {
            "Authorization": `Bearer ${get(jwt)}`
        }
    }
    return {};
};

export const headers = {
    "Content-Type": "application/json",
}