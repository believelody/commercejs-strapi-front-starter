import * as cookie from "cookie";
import api, { setAuthorization } from "$lib/api";

export async function post({ request }) {
    const body = await request.json();
    const res = await api.server.post(`auth/local/register`, body);
    if (res.error) {
        return {
            status: res.statusCode,
            body: { success: false, error: res.message }
        }
    }
    const { user: { email, id, username, provider, confirmed, blocked }, jwt } = res;
    const user = { email, id, username, provider, confirmed, blocked };
    setAuthorization(jwt);
    const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7 * 30,
        path: "/",
        secure: true,
    };
    return {
        body: { success: true, user, authenticated: true },
        headers: {
            "Set-Cookie": [
                cookie.serialize('jwt', jwt, cookieOptions),
                cookie.serialize('authenticated', "true", cookieOptions),
            ],
        }
    }
}