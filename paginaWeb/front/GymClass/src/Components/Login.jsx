import { Link } from "react-router-dom"
import { InputMovinTitle } from "./CustomTailwindElements"
import useUser from "../hooks/useUser"
import { useContext, useEffect } from "react"
import { UserContext } from "../Contexts/UserContext"
import { useNavigate   } from "react-router-dom"

export const Login = () => {

    const { login, isLogged,state } = useUser()
    
    const { role } = useContext(UserContext)

    const navigate = useNavigate ()

    useEffect(() => {
        console.log(isLogged)
        if (isLogged) {
           
            switch (role.toLowerCase()) {
                case 'a':
                    //navigate('/admin')
                    navigate('/')
                    break;
                case 'c':
                    //navigate('/client')
                    navigate('/')
                    break;
                case 'i':
                    //navigate('/instructor')
                    navigate('/')
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
            console.error(error)
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center text-center">
            <h1 className="bg-slate-300 border-4 border-teal-500 rounded-md m-2 p-1 text-2xl">Login</h1>
            <div className="max-w-6xl min-w-80 h-auto bg-gradient-to-tl from-teal-500 to-green-400 p-1 rounded-lg m-2">
                <main className="w-auto h-auto flex flex-col bg-slate-300 text-center rounded-md ">
                    {
                        state.error && <div className="bg-red-600 text-white p-2 rounded-md m-2">ERROR <br/>Email o la contraseña incorrectos</div>
                    }
                    <form className="flex flex-col w-auto m-2 gap-4" action="" method="post" onSubmit={handleSubmit}>
                        <InputMovinTitle name="Email" type="text" />
                        <InputMovinTitle name="Contraseña" type="password" />
                        <button className="bg-teal-500 w-30 border-4 border-teal-500 text-white p-2 rounded-md m-2 hover:bg-teal-400 hover:border-white hover:border-4 shadow-[2px_2px_5px_0px] shadow-gray-500">Iniciar sesión</button>
                    </form>
                    <nav className="flex flex-row gap-2 text-center content-center items-center">
                        <p className="ml-2">Aún no tiene cuenta?</p>
                        <Link to="/register"><button className="bg-teal-500 w-30 border-4 border-teal-500 text-white p-2 rounded-md m-2 hover:bg-teal-400 hover:border-white hover:border-4 shadow-[2px_2px_5px_0px] shadow-gray-500">Registro</button></Link>

                    </nav>
                </main>
            </div>

        </div>
    )
}
