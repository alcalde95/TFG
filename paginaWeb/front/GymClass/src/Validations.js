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

export const classNameValidation = ({ name }) => {
    
    if (name.length < 3) {
        return "El nombre debe tener al menos una longitud de 3 caracteres"
    }

    return ""
}

export const classDescriptionValidation = ({ description }) => {

    if (description.length < 20) {
        return "La descripción debe tener al menos una longitud de 20 caracteres"
    }
    return ""
}

export const classMaxCapacityValidation = ({ maxCapacity }) => {

    if (maxCapacity <= 0) {
        return "Al menos se debe aceptar a 1 usuario"
    }

    if (typeof maxCapacity !== "number") {
        return "La capacidad debe ser un número"
    }

    return ""
}

export const classDurationValidation = ({ duration }) => {

    if (duration <= 0) {
        return "La duración debe ser mayor a 0"
    }
    if (typeof duration !== "number") {
        return "La duración debe ser un número"
    }

    return ""
}

export const sessionDateValidation = ({ date }) => {
    
        if (!date) {
            return "La fecha es requerida"
        }
        
        if (new Date(date) < new Date()) {
            return "La fecha no puede ser anterior a la fecha actual"
        }

        return ""
}

export const sessionInstructorValidation = ({ instructorEmail }) => {
        
        if (!instructorEmail) {
            return "El instructor es requerido"
        }
        
        if (!emailValidation({ email: instructorEmail })) {
            return "El email debe tener un formato válido"
        }

        return ""
    }