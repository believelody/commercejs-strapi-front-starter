import * as cookie from "cookie";
import { serverUrl } from "$lib/utils/url.util";

export async function post({ req }) {
    const body = await req.json();
    const res = await fetch(`${serverUrl}/auth/local`, {
        method: "post",
        body: JSON.stringify(body)
    });
    const json = await res.json();
    if (json.error) {
        console.log(json.message);
        return {
            status: json.statusCode,
            body: { success: false, error: json.message }
        }
    }
    const { user: { email, id, username, provider, confirmed, blocked }, jwt } = json;
    return {
        body: { success: true },
        headers: {
            "Set-Cookie": cookie.serialize('user', JSON.stringify({ email, id, username, provider, confirmed, blocked, jwt }), {
                httpOnly : true,
                sameSite : "lax",
                maxAge : 60 * 60 * 24 * 7,
                path: "/"
            })
        }
    }
}