import {get} from "svelte/store";
import { serverUrl } from "$utils/url.util";
import { authenticateHeaders, headers } from '$lib/utils/header.util';
import {billing, profile, shipping} from "../stores";

const setAddressStores = data => {
    switch (data.type) {
        case "shipping":
            shipping.set(data);
            break;
        case "billing":
            billing.set(data);
            break;
        default:
            throw new Error("An error has occured");
    };
}

export const getAll = async (type = "") => {
    try {
        const profileStore = get(profile);
        let path = `${serverUrl}/addresses`;
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
        const res = await fetch(`${serverUrl}/addresses/countries`, {
            method: "get",
            headers
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, countries: json.countries.countries };
    } catch (error) {
        console.log(error);
    }
}

export const getSubdivisions = async (countryCode) => {
    try {
        const res = await fetch(`${serverUrl}/addresses/countries/${countryCode}/subdivisions`, {
            method: "get",
            headers
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true, subdivisions: json.subdivisions.subdivisions };
    } catch (error) {
        console.log(error);
    }
}

export const create = async (data) => {
    try {
        const res = await fetch(`${serverUrl}/addresses`, {
            method: "post",
            headers: authenticateHeaders(),
            body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.error) {
            return { success: false }
        }
        setAddressStores(data);
        profile.set(json.user);
        await getAll();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const update = async (data) => {
    try {
        const res = await fetch(`${serverUrl}/addresses/${data.id}`, {
            method: "put",
            headers: authenticateHeaders(),
            body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.error) {
            return { success: false }
        }
        setAddressStores(data);
        profile.set(json.user);
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const choose = async (data) => {
    try {
        const profileStore = get(profile);
        const res = await fetch(`${serverUrl}/users/me`, {
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
        if (json.error) {
            return { success: false }
        }
        setAddressStores(data);
        profile.set(json.user);
        profile.useLocalStorage();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (id) => {
    try {
        // const profileStore = get(profile);
        const res = await fetch(`${serverUrl}/addresses/${id}`, {
            method: "delete",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        if (json.error) {
            return { success: false }
        }
        await getAll();
        // if (profileStore.customer.meta[json.address.type].id === id) {
        //     profile.set(json.user);
        // }
        return { success: true }
    } catch (error) {
        console.log(error);
    }
}