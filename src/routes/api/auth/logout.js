import * as cookie from "cookie";
import { unsetAuthorization } from "$lib/api";

export async function post() {
    unsetAuthorization();
    const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/",
        expires: new Date(Date.now())
    };
    return {
        body: { success: true },
        headers: {
            "Set-Cookie": [
                cookie.serialize('jwt', "", cookieOptions),
                cookie.serialize('authenticated', "", cookieOptions)
            ],
        }
    }
}