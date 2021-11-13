import { browser } from "$app/env";
import { writable } from "svelte/store";

export const createWritableStore = (key, startValue = null) => {
	const { subscribe, set } = writable(startValue);

	return {
		subscribe,
		set,
		useLocalStorage: () => {
			const json = browser && localStorage.getItem(key);
			if (json ) {
				set(JSON.parse(json));
			}

			subscribe((current) => {
				if (browser) {
					if (current) {
						localStorage.setItem(key, JSON.stringify(current));
					} else {
						localStorage.removeItem(key);
					}
				}
			});
		}
	};
};

export const user = createWritableStore('user', {});
export const cart = createWritableStore('cart');
export const locale = createWritableStore("lang", "fr");
export const checkout = writable(null);
export const modal = writable(null);
export const sidebar = writable(null);
export const shipping = writable({});
export const billing = writable({});
export const isBillingSameAsShipping = writable(true);
export const paymentMethod = writable(null);
export const stripe = writable(null);
export const paypal = writable(null);
export const checkoutLoading = writable(false);