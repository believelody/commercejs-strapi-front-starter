export async function getSession({ locals }) {
    return locals.user || {};
}

export async function handle({ event, resolve }) {
    const response = await resolve(event);
    return response;
}