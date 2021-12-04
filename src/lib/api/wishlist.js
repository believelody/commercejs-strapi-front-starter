import { authenticateHeaders } from "../utils/header.util";
import { baseUrl } from "../utils/url.util"

export const getFromUser = async () => {
    try {
        const res = await fetch(`${baseUrl}/wishlists`, {
            method: "get",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        if (json.error) {
            return { reviews: [] };
        }
        console.log(json);
        return [];
    } catch (error) {
        console.log(error);
    }
}