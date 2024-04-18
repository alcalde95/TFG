import { Link } from "react-router-dom"
import { InputMovinTitle } from "./CustomTailwindElements"
import useUser from "../hooks/useUser"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Register = () => {

    const [registerState, setRegisterState] = useState(false)
    const { register, state, emailError, passwordError } = useUser()
    const [repeatedPasword, setRepeatedPasword] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (registerState && !state.error) {
            navigate('/login')
        }
        if (registerState && state.error) {
            setRegisterState(false)
        }

    }, [registerState, state.error, navigate])


    //TODO: Add a loading and error state to the form and data validation

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        const email = data.get("Email")
        const password = data.get("Contraseña")
        const password2 = data.get("Contraseña Repetida")
        if (password !== password2) {
            setRepeatedPasword('Contraseñas no coinciden')
            return
        } else setRepeatedPasword(false)
        await register({ email, password })

        setRegisterState(true)

    }

    return (
        <div className="h-screen flex flex-col justify-center text-center">
            <main className="w-auto h-auto flex flex-col bg-slate-300 text-center rounded-md ">
                <h1 className="text-2xl underline">Register</h1>
                {
                    state.error && <div className="bg-red-600 text-white p-2 rounded-md m-2">ERROR <br />Este email ya está registrado</div>
                }
                <form className="flex flex-col w-auto m-2 gap-4" action="" method="post" onSubmit={handleSubmit}>
                    <InputMovinTitle name="Email" type="text" />
                    {
                        emailError && <div className="bg-red-600 text-white p-2 rounded-md m-2">{emailError}</div>
                    }
                    <InputMovinTitle name="Contraseña" type="password" />
                    {
                        passwordError && <div className="bg-red-600 text-white p-2 rounded-md m-2">{passwordError}</div>
                    }
                    <InputMovinTitle name="Contraseña Repetida" type="password" />
                    {
                        repeatedPasword && <div className="bg-red-600 text-white p-2 rounded-md m-2">Las contraseñas no coinciden</div>
                    }

                    <button className="bg-teal-500 w-30 border-4 border-teal-500 text-white p-2 rounded-md m-2 hover:bg-teal-400 hover:border-white hover:border-4 shadow-[2px_2px_5px_0px] shadow-gray-500">Registrar</button>
                </form>
                <nav className="flex flex-row gap-2 text-center content-center items-center">
                    <p className="ml-2">Ya tiene cuenta?</p>
                    <Link to="/login"><button className="bg-teal-500 w-30 border-4 border-teal-500 text-white p-2 rounded-md m-2 hover:bg-teal-400 hover:border-white hover:border-4 shadow-[2px_2px_5px_0px] shadow-gray-500">Iniciar Sesión</button></Link>

                </nav>
            </main>


        </div>
    )
}
