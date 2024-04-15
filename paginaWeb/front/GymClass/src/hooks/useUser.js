import { useContext, useState, useCallback } from "react"

import { UserContext } from "../Contexts/UserContext"
import { loginService } from "../Services/loginService"
import { registerService } from "../Services/registerService"

import { emailValidation, passwordValidation} from "../Validations"
import { isValidatedClientService } from "../Services/usersService"

const useUser = () => {
    const { jwt, setJWT, setRole, setEmail } = useContext(UserContext)

    const [state, setState] = useState({ loading: false, error: false })
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [validated,setValidated] = useState(false)

    const login = useCallback(async ({ email, password }) => {
        try {
            setState({ loading: true, error: false })
            const res = await loginService({ email, password })
            if (res) {
                setState({ loading: false, error: false })
                setJWT(res.jwt)
                setRole(res.role)
                setEmail(email)
                window.sessionStorage.setItem('jwt', res.jwt)
                window.sessionStorage.setItem('role', res.role)
                window.sessionStorage.setItem('email', email)

            }

        } catch (error) {
            setState({ loading: false, error: true })
        }

    }, [setJWT, setRole, setEmail])


    const register = useCallback(async ({ email, password, role = 'C' }) => {
        try {

            const emailValidationResult = emailValidation({ email })
            const passwordValidationResult = passwordValidation({ password })

            let error = false

            if (!emailValidationResult) {
                setEmailError('Email no válido')
                error = true
            } else {
                setEmailError(false)
            }

            if (!passwordValidationResult) {
                setPasswordError('Contraseña no válida')
                error = true
            }
            else {
                setPasswordError(false)
            }

            if (error) {
                setState({ loading: false, error: true })
                return false
            }

            setState({ loading: true, error: false })
            await registerService({ email, password, role })
            return true;
        } catch (error) {
            console.log(error.message)
            setState({ loading: false, error: true })
            return false;
        }
    }, [])


    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt')
        window.sessionStorage.removeItem('role')
        window.sessionStorage.removeItem('email')
        setJWT(null)
        setRole(null)
        setEmail(null)
    }, [setJWT, setRole, setEmail])


    

    const resetErrors = () => {
        setEmailError(false)
        setPasswordError(false)
    }

    const isValidatedClient = async () => {
        try {
            const res = await isValidatedClientService({ jwt })
            console.log(typeof res)
            setValidated(res)
            console.log(validated)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        isLogged: Boolean(jwt),
        login,
        logout,
        register,
        isValidatedClient,
        resetErrors,
        state,
        emailError,
        passwordError,
        validated,
    }
}
export default useUser
