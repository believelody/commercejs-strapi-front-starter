import { get } from "svelte/store";
import { locale } from '$lib/stores';
import { t } from '$lib/i18n';
import { DateTime } from "luxon";

export const localDateFromSeconds = (date, isNumeric) => {
    const lang = get(locale);
    const options = { year: 'numeric', month: isNumeric ? 'numeric' : 'long', day: 'numeric' };
    return DateTime.fromSeconds(date).setLocale(lang).toLocaleString(options);
};

export const localDateFromString = (date, isNumeric) => {
    const lang = get(locale);
    const options = { year: 'numeric', month: isNumeric ? 'numeric' : 'long', day: 'numeric' };
    return DateTime.fromISO(date).setLocale(lang).toLocaleString(options);
};

export const localDateFromObject = date => {
    const lang = get(locale);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return DateTime.fromObject(date).setLocale(lang).toLocaleString(options);
};

export const localDate = (...date) => {
    const lang = get(locale);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return DateTime.local(date).setLocale(lang).toLocaleString(options);
}

export const localDateFromJSDate = date => {
    if (date instanceof Date && isNaN(date)) {
        const translation = get(t);
        return translation("common.error-date");
    }
    const lang = get(locale);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return DateTime.fromJSDate(date).setLocale(lang).toLocaleString(options)
}