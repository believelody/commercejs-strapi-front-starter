import { baseUrl } from "../utils/url.util";
import { headers } from "../utils/header.util";
import { checkout, checkoutLoading } from "../stores";

export const getCheckout = async (checkoutId) => {
    try {
        const res = await fetch(`${baseUrl}/checkout/${checkoutId}`);
        const json = await res.json();
        checkout.set(json);
    } catch (error) {
        console.log(error);
    }
}

export const getCheckoutByCart = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/checkout/${id}?type=cart`);
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        checkout.set(json);
        return { success: true };
    } catch (error) {
        console.log(error);
    }
};

export const getCountries = async (tokenId) => {
    try {
        const res = await fetch(`${baseUrl}/checkout/${tokenId}/available-countries`);
        const json = await res.json();
        if (res.error) {
            return { success: false };
        }
        return { success: true, countries: json.countries };
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
        if (json.valid) {
            await getCheckout(checkoutId);
        }
    } catch (error) {
        console.log(error);
    }
}

export const checkQuantity = async (checkoutId, itemId, amount, variantId) => {
    try {
        let path = new URL(`${baseUrl}/checkout/${checkoutId}/check/${itemId}/quantity`);
        path.searchParams.append("amount", amount);
        if (variantId) {
            path.searchParams.append("variant_id", variantId);
        }
        const res = await fetch(path);
        const json = await res.json();
        if (json.error) {
            console.log(json.error);
        }
        else if (json.available) {
            await getCheckout(checkoutId)
        }
    } catch (error) {
        console.log(error);
    }
}

export const checkVariant = async (checkoutId, itemId, variantId = "", groupId = "", optionId = "") => {
    try {
        let path = new URL(`${baseUrl}/checkout/${checkoutId}/check/${itemId}/variant`);
        if (variantId) {
            path.searchParams.append("variant_id", variantId);
        }
        if (optionId) {
            path.searchParams.append("option_id", optionId);
        }
        if (groupId) {
            path.searchParams.append("group_id", groupId);
        }
        const res = await fetch(path);
        const json = await res.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}

export const checkDiscount = async (checkoutId, code) => {
    try {
        const res = await fetch(`${baseUrl}/checkout/${checkoutId}/check/discount?code=${code}`);
        const json = await res.json();
        if (json.valid) {
            checkoutLoading.set(true);
            await getCheckout(checkoutId);
            checkoutLoading.set(false);
        }
        return json.valid;
    } catch (error) {
        console.log(error);
    }
}

export const onCaptureOrder = async (checkoutId, orderData) => {
    try {
        const res = await fetch(`${baseUrl}/checkout/${checkoutId}/capture-order`, {
            method: "post",
            headers,
            body: JSON.stringify(orderData)
        });
        const json = await res.json();
        if (res.error) {
            return { success: false, error: json.error }
        }
        return { success: true, ...json };
    } catch (error) {
        console.log("error: ", error);
    }
}