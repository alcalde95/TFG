import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"
import { useCallback } from "react"
import { loginService } from "../Services/loginService"
import { useState } from "react"
import { registerService } from "../Services/registerService"
import { emailValidation, passwordValidation } from "../Validations"

const useUser = () => {
    const { jwt, setJWT, setRole } = useContext(UserContext)
    const [state, setState] = useState({ loading: false, error: false })
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const login = useCallback(async ({ email, password }) => {
        try {
            setState({ loading: true, error: false })
            const res = await loginService({ email, password })
            if (res) {
                setState({ loading: false, error: false })
                setJWT(res.jwt)
                setRole(res.role)
                window.sessionStorage.setItem('jwt', res.jwt)
                window.sessionStorage.setItem('role', res.role)

            }

        } catch (error) {
            setState({ loading: false, error: true })
        }

    }, [setJWT, setRole])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt')
        window.sessionStorage.removeItem('role')
        setJWT(null)
        setRole(null)
    }, [setJWT, setRole])

    const register = useCallback(async ({ email, password, role = 'C' }) => {
        try {
            
            const emailValidationResult = emailValidation({ email })
            const passwordValidationResult = passwordValidation({ password })

           
            if (!emailValidationResult) {
                setEmailError('Email no válido')
            }else{
                setEmailError(false)
            }

            if(!passwordValidationResult){
                setPasswordError('Contraseña no válida')
            }
            else{
                setPasswordError(false)
            }
            
           

            if(!emailValidationResult){
                console.log('error')
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

    return {
        isLogged: Boolean(jwt),
        login,
        logout,
        register,
        state,
        emailError,
        passwordError
    }
}
export default useUser
