import * as cookie from "cookie";
import api, { setAuthorization } from "$lib/api";

export async function get({ request }) {
    try {
        const cookies = cookie.parse(request.headers.get('cookie') || "");
        if (!cookies?.authenticated) {
            return {
                status: 401,
                body: { success: false, error: 'unauthenticated' }
            };
        }
        const { jwt } = cookies;
        setAuthorization(jwt);
        const res = await api.server.get("users/me");
        if (res.error) {
            return {
                status: 400,
                body: { success: false, error: res.error },
            };
        }
        return {
            body: { success: true, user: res },
        };
    } catch (error) {
        console.log(error);
    }
}