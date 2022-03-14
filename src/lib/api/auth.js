import { get } from 'svelte/store';
import { goto } from '$app/navigation'
import { user, jwt } from '$lib/stores';
import { profile } from '../stores';
import { getAll } from './address';
import { authenticateHeaders, headers } from '$utils/header.util';
import { serverUrl } from '$utils/url.util';

export const login = async (identifier, password) => {
    try {
        const res = await fetch(`${serverUrl}/auth/local`, {
            method: "post",
            headers,
            body: JSON.stringify({ identifier, password })
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        const { user: { email, id, username, provider, confirmed, blocked }, jwt: token } = json;
        jwt.set(token);
        jwt.useLocalStorage();
        user.set({ email, id, username, provider, confirmed, blocked });
        user.useLocalStorage();
        await getMe();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const register = async (firstname, lastname, email, password) => {
    try {
        const res = await fetch(`${serverUrl}/auth/local/register`, {
            method: "post",
            headers,
            body: JSON.stringify({ firstname, lastname, email, password })
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        const { user: { email : userEmail, id, username, provider, confirmed, blocked }, jwt: token } = json;
        jwt.set(token);
        jwt.useLocalStorage();
        user.set({ email: userEmail, id, username, provider, confirmed, blocked });
        user.useLocalStorage();
        profile.set(json.user);
        profile.useLocalStorage();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const logout = () => {
    profile.set(null);
    user.set({});
    jwt.set(null);
    goto("/");
}

export const getMe = async () => {
    try {
        const res = await fetch(`${serverUrl}/users/me`, {
            method: "get",
            headers: authenticateHeaders()
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        profile.set(json);
        profile.useLocalStorage();
        await getAll();
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const codeVerification = async (email, code) => {
    try {
        const res = await fetch(`${serverUrl}/auth/email-confirmation`, {
            method: "post",
            headers,
            body: JSON.stringify({ email, code })
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        user.set({
            ...get(user),
            confirmed: true,
        });
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}

export const resendCode = async (email) => {
    try {
        const res = await fetch(`${serverUrl}/auth/send-email-confirmation`, {
            method: "post",
            headers,
            body: JSON.stringify({ email }),
        });
        const json = await res.json();
        if (json.error) {
            return { success: false, error: json.error };
        }
        return { success: true };
    } catch (error) {
        console.log(error);
    }
}