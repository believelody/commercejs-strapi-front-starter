import { user } from '$lib/stores'
import { headers } from '../utils/header.util';
import { baseUrl } from '../utils/url.util';

export const login = async (identifier, password) => {
    try {
        const res = await fetch(`${baseUrl}/auth/local`, {
            method: "post",
            headers,
            body: JSON.stringify({ identifier, password })
        });
        const json = await res.json();
        if (json.user) {
            const { user : data, jwt } = json;
            user.set({ jwt, ...data });
            user.useLocalStorage();
            return { statusCode: 200 }
        }
        return json
    } catch (error) {
        console.log(error);
    }
}