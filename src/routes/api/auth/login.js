import * as cookie from "cookie";
import api, { setAuthorization } from "$lib/api";
import { authenticated } from "$lib/stores";

export async function post({ request }) {
    const body = await request.json();
    const res = await api.server.post(`auth/local`, body);
    if (res.error) {
        console.log(res);
        return {
            status: res.statusCode,
            body: { success: false, error: res.message }
        }
    }
    const { user: { email, id, username, provider, confirmed, blocked }, jwt } = res;
    setAuthorization(jwt);
    const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    };
    authenticated.set(confirmed);
    return {
        body: { success: true },
        headers: {
            "Set-Cookie": [
                cookie.serialize('user', JSON.stringify({ email, id, username, provider, confirmed, blocked }), cookieOptions),
                cookie.serialize('authenticated', "true", cookieOptions),
                cookie.serialize('jwt', jwt, cookieOptions)
            ],
        }
    }
}