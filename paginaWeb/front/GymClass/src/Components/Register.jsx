import { Link } from "react-router-dom"
import { DefaultWhiteButton, FullWDefaultButton, InputMovinTitle } from "./CustomTailwindElements"
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
        <div className="h-screen flex flex-col w-full justify-center text-center items-center text-white">
            <main className="w-11/12 sm:w-4/5 md:w-[400px] h-auto flex flex-col bg-transparent text-center rounded-md p-1 border border-gray-500 ">
                <h1 className="text-2xl underline">Registro</h1>
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

                    <DefaultWhiteButton text="Registrarse" />
                </form>
                <nav className="w-auto m-2 h-auto mt-0" >
                    <div className="relative flex items-center pb-1">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink mx-2 text-gray-500">O si ya tiene cuenta</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <Link to="/login"><FullWDefaultButton text={"Login"} /></Link>
                </nav>
            </main>


        </div>
    )
}
