const authHeader = () => {
    const token = JSON.parse(window.localStorage.getItem('authToken'));

    return token ? { Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('authToken')) } : {};
};

const isLoggedIn = () => {
    return !!JSON.parse(window.localStorage.getItem('authToken'));
};

export { authHeader, isLoggedIn };
