import {get} from "svelte/store";
import { baseUrl } from "../utils/url.util";
import { authenticateHeaders } from '$lib/utils/header.util';
import { getMe } from "./auth";
import {profile} from "../stores";


export const getAll = async (type = "") => {
    try {
        const profileStore = get(profile);
        let path = `${baseUrl}/addresses`;
        if (type) {
            path += `?type=${type}`;
        }
        const res = await fetch(path, {
            method: "get",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        if (json.error) {
            return { success: false };
        }
        profile.set({
            ...profileStore,
            addresses: json.addresses
        });
        profile.useLocalStorage();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const getCountries = async () => {
    try {
        const res = await fetch(`${baseUrl}/addresses/countries`, {
            method: "get",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        if (json.error) {
            return { statusCode: json.statusCode };
        }
        return json.countries.countries;
    } catch (error) {
        console.log(error);
    }
}

export const create = async (data) => {
    try {
        const res = await fetch(`${baseUrl}/addresses`, {
            method: "post",
            headers: authenticateHeaders(),
            body: JSON.stringify(data),
        });
        const json = await res.json();
        console.log(json);
        if (json.error) {
            return { success: false }
        }
        profile.set(json.user);
        // await getAll();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const update = async (data) => {
    try {
        const res = await fetch(`${baseUrl}/addresses/${data.id}`, {
            method: "put",
            headers: authenticateHeaders(),
            body: JSON.stringify(data),
        });
        const json = await res.json();
        console.log("update address: ", json);
        if (json.error) {
            return { success: false }
        }
        profile.set(json.user);
        // const { addresses } = await getAll();
        // profile.set({
        //     ...profileStore,
        //     addresses,
        //     customer: {
        //         ...profileStore.customer,
        //         meta: {
        //             ...profileStore.customer.meta,
        //             [json.address.type]: json.address
        //         }
        //     }
        // });
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const choose = async (data) => {
    try {
        const profileStore = get(profile);
        console.log(profileStore.customer.meta);
        const res = await fetch(`${baseUrl}/users/me`, {
            method: "put",
            headers: authenticateHeaders(),
            body: JSON.stringify({
                customerData: {
                    meta: {
                        ...profileStore.customer.meta,
                        [data.type]: data
                    }
                }
            }),
        });
        const json = await res.json();
        console.log("choose: ", json);
        if (json.error) {
            return { success: false }
        }
        profile.set(json.user);
        profile.useLocalStorage();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (id) => {
    try {
        const profileStore = get(profile);
        const res = await fetch(`${baseUrl}/addresses/${id}`, {
            method: "delete",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        if (json.error) {
            return { success: false }
        }
        if (profileStore.customer.meta[json.address.type].id === id) {
            profile.set(json.user);
        }
        // await getAll();
    } catch (error) {
        console.log(error);
    }
}