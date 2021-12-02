import {baseUrl} from "../utils/url.util";
import {authenticateHeaders} from "../utils/header.util";
import {user} from "../stores";


export const updateUser = async (data) => {
    try {
        const res = await fetch(`${baseUrl}/users/me`, {
            method: "put",
            headers: authenticateHeaders(),
            body: JSON.stringify(data)
        });
        const json = await res.json();
        user.set(json.user);
        user.useLocalStorage();
    } catch (e) {
        console.log(e);
    }
}