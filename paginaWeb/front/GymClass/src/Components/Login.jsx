import { Link } from "react-router-dom"
import { DefaultWhiteButton, FullWDefaultButton, InputMovinTitle } from "./CustomTailwindElements"
import useUser from "../hooks/useUser"
import { useContext, useEffect } from "react"
import { UserContext } from "../Contexts/UserContext"
import { useNavigate } from "react-router-dom"

export const Login = () => {

    const { login, isLogged, state } = useUser()

    const { role } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged) {

            switch (role.toLowerCase()) {
                case 'a':
                    navigate('/admin')
                    break;
                case 'c':
                    navigate('/client')
                    break;
                case 'i':
                    //navigate('/instructor')
                    navigate('/instructor')
                    break;
                default:
                    navigate('/');
            }


        }
    }, [isLogged, role, navigate])


    const handleSubmit = async (event) => {
        event.preventDefault()
        let form = event.target
        let data = new FormData(form)
        let email = data.get("Email")
        let password = data.get("Contraseña")
        try {

            login({ email, password })

            //alert(res.role, res.jwt)
        } catch (error) {
            console.log(error)
        }
        //TODO MEJORAR ESTO
    }

    return (
        <div className="h-screen flex flex-col w-full justify-center text-center items-center text-white">

            <main className="w-11/12 sm:w-4/5 md:w-[400px] h-auto flex flex-col bg-transparent text-center rounded-md p-1 border border-gray-500 ">
                <h1 className="text-2xl underline">Login</h1>
                {
                    state.error && <div className="bg-red-600 text-white p-2 rounded-md m-2">ERROR <br />Email o la contraseña incorrectos</div>
                }
                <form className="flex flex-col w-auto m-2 gap-4" action="" method="post" onSubmit={handleSubmit}>
                    <InputMovinTitle name="Email" type="text" />
                    <InputMovinTitle name="Contraseña" type="password" />
                    <DefaultWhiteButton text={"Iniciar sesión"} />
                </form>
                <nav className="w-auto m-2 h-auto mt-0" >
                    <div className="relative flex items-center pb-1">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink mx-2 text-gray-500">O si no tiene cuenta</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <Link to="/register"><FullWDefaultButton text={"Registro"} /></Link>
                </nav>
            </main>


        </div>
    )
}
