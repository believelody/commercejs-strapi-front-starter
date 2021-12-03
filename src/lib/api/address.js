import { baseUrl } from "../utils/url.util";
import { authenticateHeaders } from '$lib/utils/header.util';
import {get} from "svelte/store";
import {profile} from "../stores";

export const getAll = async (type = "") => {
    try {
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
            return { statusCode: json.statusCode };
        }
        return json;
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
        if (json.error) {
            return { success: false }
        }
        profile.set({
            ...get(profile),
            customer: {
                ...get(profile).customer,
                meta: {
                    ...get(profile).customer.meta,
                    [data.type]: json.address,
                }
            }
        });
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
        profile.set({
            ...get(profile),
            customer: {
                ...get(profile).customer,
                meta: {
                    ...get(profile).customer.meta,
                    [data.type]: json.address,
                }
            }
        });
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}