import { baseUrl } from "../utils/url.util";
import { authenticateHeaders } from '$lib/utils/header.util';

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
        return json;
    } catch (error) {
        console.log(error);
    }
}

export const getCountries = async () => {
    try {
        let path = `${baseUrl}/addresses/countries`;
        const res = await fetch(path, {
            method: "get",
            headers: authenticateHeaders()
        });
        const { countries: json } = await res.json();
        return json.countries;
    } catch (error) {
        console.log(error);
    }
}