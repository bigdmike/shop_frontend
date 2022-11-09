export function getLocalStorage(key) {
    return localStorage.getItem(key)
}

export function setLocalStorage(key, val) {
    return localStorage.setItem(key, val)
}

export function delLocalStorage(key) {
    return localStorage.removeItem(key)
}