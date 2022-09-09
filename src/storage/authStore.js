const key = 'isAuth';

export const isLogged = () => {
    const isAuthVal = localStorage.getItem(key);
    return JSON.parse(isAuthVal);
}

export const setLogged = () => {
    localStorage.setItem(key, true);
}

export const setLoggedOut = () => {
    localStorage.setItem(key, false);
}