import { validEmail,validPassword } from "../../../regex";

export const verifyEmail = (email) => {
    if (!validEmail.test(email)) {
        return false;
    } else return true;
}

export const verifyPassword = (password) => {
    if (!validPassword.test(password)) {
        return false;
    } else return true;
}

export const showHTMLelement = (id, mensaje) => {
    document.getElementById(id).style.display = 'block'
    document.getElementById(id).textContent = mensaje
}

export const hideHTMLelement = (id) => {
    document.getElementById(id).style.display = 'none'
}
