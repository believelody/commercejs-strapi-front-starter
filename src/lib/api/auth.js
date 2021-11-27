import { user, jwt } from '$lib/stores';
import { authenticateHeaders, headers } from '../utils/header.util';
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
            const { user: { email, id, username, provider, confirmed, blocked }, jwt: token } = json;
            jwt.set(token);
            jwt.useLocalStorage();
            user.set({ email, id, username, provider, confirmed, blocked });
            user.useLocalStorage();
            return { statusCode: 200 }
        }
        return json
    } catch (error) {
        console.log(error);
    }
}

export const register = async (firstname, lastname, email, password) => {
    try {
        const res = await fetch(`${baseUrl}/auth/local/register`, {
            method: "post",
            headers,
            body: JSON.stringify({ firstname, lastname, email, password })
        });
        const json = await res.json();
        if (json.user) {
            const { user: { email, id, username, provider, confirmed, blocked }, jwt: token } = json;
            jwt.set(token);
            jwt.useLocalStorage();
            user.set({ email, id, username, provider, confirmed, blocked });
            user.useLocalStorage();
            return { statusCode: 200 }
        }
        return json
    } catch (error) {
        console.log(error);
    }
}

export const getMe = async () => {
    try {
        const res = await fetch(`${baseUrl}/users/me`, {
            method: "get",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

export const codeVerification = async (email, code) => {
    try {
        const res = await fetch(`${baseUrl}/auth/email-confirmation`, {
            method: "post",
            headers,
            body: JSON.stringify({ email, code })
        });
        const json = await res.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
    }
}

export const resendCode = async (email) => {
    try {
        const res = await fetch(`${baseUrl}/auth/send-email-confirmation`, {
            method: "post",
            headers,
            body: JSON.stringify({ email }),
        });
        const json = res.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}