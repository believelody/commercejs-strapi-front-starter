import { get } from "svelte/store";
import { locale } from '$lib/stores';

export const localDate = date => {
    const lang = get(locale);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(lang, options)
}