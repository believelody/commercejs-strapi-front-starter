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

export const user = createWritableStore('user');
export const checkout = createWritableStore('checkout');
export const cart = createWritableStore('cart');
export const modal = writable(null);
export const sidebar = writable(null);
export const locale = createWritableStore("lang", "fr");