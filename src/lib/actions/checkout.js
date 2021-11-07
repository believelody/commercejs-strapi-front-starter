import { baseUrl } from "../utils/url.util"

export const getCheckout = (id, type) => {
    return fetch(`${baseUrl}/checkout/${id}?type=${type}`).then(res => res.json());
};

export const getCountries = async (tokenId) => {
    try {
        const res = await fetch(`${baseUrl}/checkout/${tokenId}/available-countries`);
        const json = await res.json();
        return json.countries;
    } catch (error) {
        console.log(error);
    }
}

export const getSubdivisions = async (checkoutId, countryCode) => {
    try {
        const res = await fetch(`${baseUrl}/checkout/${checkoutId}/countries/${countryCode}/subdivisions`);
        const json = await res.json();
        return json.subdivisions;
    } catch (error) {
        console.log(error);
    }
}