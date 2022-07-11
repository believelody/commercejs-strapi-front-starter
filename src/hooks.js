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
    const cookies = cookie.parse(event.request.headers.cookie || '');
    console.log("handle cookies: ", cookies);
    if (Object.values(cookies).length) {
        event.locals.user = cookies.user;
        event.locals.authenticated = cookies.authenticated;
    }
    const response = await resolve(event);
    console.log("handle", event.locals);
    response.headers['set-cookie'] = `user=${event.locals.user || ''}; Path=/; HttpOnly`
    response.headers['set-cookie'] = `authenticated=${event.locals.authenticated || ''}; Path=/; HttpOnly`
    return response;
}