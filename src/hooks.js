import * as cookie from "cookie";

export async function getSession({ request }) {
    // console.log("event : ", event);
    console.log(cookie.parse(request.headers.cookie || ""));
    const cookies = cookie.parse(request.headers.cookie || "");
    // console.log("cookies : ", cookies);
    return {};
}