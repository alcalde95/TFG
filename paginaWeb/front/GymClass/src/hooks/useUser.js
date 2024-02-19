import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"
import { useCallback } from "react"
import { loginService } from "../Services/loginService"
import { useState } from "react"
import { registerService } from "../Services/registerService"

const useUser = () => {
    const { jwt, setJWT, setRole } = useContext(UserContext)
    const [state, setState] = useState({ loading: false, error: false })

    const login = useCallback(async ({ email, password }) => {
        try {
            setState({ loading: true, error: false })
            const res = await loginService({ email, password })
            if (res) {
                setState({ loading: false, error: false })
                console.log(res)
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
            setState({ loading: true, error: false })
            await registerService({ email, password, role })
            return true;
        } catch (error) {
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
    }
}
export default useUser
