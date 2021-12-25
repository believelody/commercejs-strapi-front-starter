import { derived } from "svelte/store";
import { locale } from "./stores";
import fr from "$lib/lang/fr.json";
import en from "$lib/lang/en.json";

export const translations = { fr, en };
export const locales = Object.keys(translations);

function getTranslation(obj, path) {
    return path.split('.').reduce((acc, key) => {
        return acc[key];
    }, obj);
}

function translate(locale, keys, vars) {
    if (!keys) throw new Error("no key provided to $t()");
    if (!locale) throw new Error(`no translation for key "${keys}"`);
    const translationObj = translations[locale];
    let text = getTranslation(translationObj, keys);
    if (!text) {
        return getTranslation(translationObj, "common.no-translation");
    }
    // Replace any passed in variables in the translation string.
    Object.keys(vars).map((k) => {
        const regex = new RegExp(`{{${k}}}`, "g");
        text = text.replace(regex, vars[k]);
    });
    return text;
}

export const t = derived(locale, ($locale) => (keys, vars = {}) =>
    translate($locale, keys, vars)
);
