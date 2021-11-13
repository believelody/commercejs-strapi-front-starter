import { get } from "svelte/store";
import { checkout } from "../stores";

export const updateCheckoutFromCart = (cart) => {
    if (get(checkout)) {
        const updatedCheckout = get(checkout);
        const subtotal = cart.subtotal;
        const shippingTotal = updatedCheckout.live.shipping.price;
        const totalPriceRaw = (subtotal.raw + shippingTotal.raw).toFixed(2);
        const total = {
            raw: totalPriceRaw,
            formatted_with_symbol: `€${totalPriceRaw}`,
            formatted_with_code: `${totalPriceRaw} EUR`
        }
        checkout.set({
            ...updatedCheckout,
            live: {
                ...updatedCheckout.live,
                line_items: cart.line_items,
                subtotal,
                total,
            }
        });
    }
}