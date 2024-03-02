export const emailValidation = ({ email }) => {
    const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regExp.test(email)
}

export const passwordValidation = ({ password }) => {
    return password.length >= 8
}

export const roleValidation = ({ role }) => {
    const regExp = /^[a|c|i]$/
    return regExp.test(role.toLowerCase())
}