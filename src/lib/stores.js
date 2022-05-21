import { browser } from "$app/env";
import { writable } from "svelte/store";
import watchMedia from "svelte-media";

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

const mediaqueries = {
	mobile: "(min-width: 0px) and (max-width: 767px)",
	tablet: "(min-width: 768px) and (max-width: 1023px)",
	desktop: "(min-width: 1024px)",
	landscape: "(orientation: landscape) and (max-height: 499px)",
	tiny: "(orientation: portrait) and (max-height: 599px)",
	dark: "(prefers-color-scheme: dark)",
	noanimations: "(prefers-reduced-motion: reduce)"
};

export const media = watchMedia(mediaqueries);
export const user = createWritableStore('user', {});
export const profile = createWritableStore('profile');
export const guest = createWritableStore('guest');
export const jwt = createWritableStore('jwt');
export const cart = createWritableStore('cart');
export const locale = createWritableStore("lang", "fr");
export const checkout = writable(null);
export const sidebar = writable(null);
export const shipping = writable({});
export const billing = writable({});
export const isBillingSameAsShipping = writable(true);
export const paymentMethod = writable(null);
export const stripe = writable(null);
export const paypal = writable(null);
export const checkoutLoading = writable(false);
export const orders = writable([]);
export const categories = writable([]);
export const reviewsUser = writable([]);
export const reviewsProduct = writable([]);

export const resetStores = () => {
	guest.set(null);
	guest.useLocalStorage();
	cart.set(null);
	cart.useLocalStorage();
	checkout.set(null);
	checkoutLoading.set(false);
	paymentMethod.set(null);
	shipping.set({});
	isBillingSameAsShipping.set(true);
	billing.set({});
	paypal.set(null);
	stripe.set(null);
}