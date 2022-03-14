export const emailValidation = value => !!(value && value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/))

export const requiredFieldsValidation = (obj, fields) => {
    const validators = obj ? fields.map(field => obj[field]) : [];
    return validators.every(field => field);
}

export const onInput = (e, data) => {
    data[e.target.name] = e.target.value;
}