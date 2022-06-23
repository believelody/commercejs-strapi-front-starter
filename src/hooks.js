import * as cookie from "cookie";

export async function getSession({ request, locals }) {
    console.log("get session : ", locals.user);
    const cookies = cookie.parse(request.headers.get('cookie') || "");
    return locals.user ? locals.user : cookies.user && cookies.authenticated ? {
        user: JSON.parse(cookies.user),
        authenticated: JSON.parse(cookies.authenticated)
    } : {};
}

export async function handle({ event, resolve }) {
    const response = await resolve(event);
    return response;
}