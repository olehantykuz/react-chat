const authHeader = () => {
    const token = JSON.parse(window.localStorage.getItem('authToken'));

    return token ? { Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('authToken')) } : {};
};

const isLoggedIn = () => {
    return !!JSON.parse(window.localStorage.getItem('authToken'));
};

const isObject = val => {
    return (!!val) && (val.constructor === Object);
};

const isArray = val => {
    return (!!val) && (val.constructor === Array);
};

const hasError = (errors = {}) => {
    for (let key in errors) {
        if (errors[key]) {

            return true;
        }
    }

    return false;
};

const processServerErrors = data => {
    const body = data.response.data;
    const errors = body.errors || (body.error ? [body.error] : [body.message]);

    let result = [];
    if (isObject(errors)) {
        for (let key in errors) {
            if (isArray(errors[key])) {
                errors[key].forEach(err => {
                    result.push(err);
                })
            } else {
                result.push(errors[key].toString())
            }
        }
    } else {
        result = isArray(errors) ? errors : errors.toString();
    }

    return result;
};

export { authHeader, isLoggedIn, isObject, isArray, hasError, processServerErrors };
