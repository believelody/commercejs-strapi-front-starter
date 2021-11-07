import { baseUrl } from "../utils/url.util"

export const getCheckout = async (id, type) => {
    try {
        const res = await fetch(`${baseUrl}/checkout/${id}?type=${type}`);
        const json = await res.json();
        return json;
    } catch (error) {
        console.log(error);
    }
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

export const chooseShippingMethod = async (checkoutId, shippingMethodId, country) => {
    try {
        const res = await fetch(`${baseUrl}/checkout/${checkoutId}/check/shipping?shipping_option_id=${shippingMethodId}&country=${country}`);
        const json = await res.json();
        return json.live;
    } catch (error) {
        console.log(error);
    }
}