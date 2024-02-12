import { Link } from "react-router-dom"
import { InputMovinTitle } from "./CustomTailwindElements"

export const Register = () => {
    
    return (
        <div className="h-screen flex flex-col justify-center text-center">
            <h1 className="bg-slate-300 border-4 border-teal-500 rounded-md m-2 p-1 text-2xl">Register</h1>
            <div className="max-w-6xl min-w-80 h-auto bg-gradient-to-tl from-teal-500 to-green-400 p-1 rounded-lg m-2">
                <main className="w-auto h-auto flex flex-col bg-slate-300 text-center rounded-md ">

                    <form className="flex flex-col w-auto m-2 gap-4" action="" method="post">
                        <InputMovinTitle name="Email" type="text" />
                        <InputMovinTitle name="Contraseña" type="password" />
                        <InputMovinTitle name="Contraseña Repetida" type="password" />
                        <button className="bg-teal-500 w-30 border-4 border-teal-500 text-white p-2 rounded-md m-2 hover:bg-teal-400 hover:border-white hover:border-4 shadow-[2px_2px_5px_0px] shadow-gray-500">Registrar</button>
                    </form>
                    <nav className="flex flex-row gap-2 text-center content-center items-center">
                        <p className="ml-2">Ya tiene cuenta?</p>
                        <Link to="/login"><button className="bg-teal-500 w-30 border-4 border-teal-500 text-white p-2 rounded-md m-2 hover:bg-teal-400 hover:border-white hover:border-4 shadow-[2px_2px_5px_0px] shadow-gray-500">Iniciar Sesión</button></Link>

                    </nav>
                </main>
            </div>

        </div>
    )
}
