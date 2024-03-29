import { Link } from "react-router-dom"
import { Header } from "./Header"
import { useClasses } from "../hooks/useClasses"
import { Classes } from "./Classes/Classes"
import { useContext, useEffect } from "react"
import { ClassesContext } from "../Contexts/ClassesContext"

export const LandingPage = () => {
    const {classes} = useContext(ClassesContext)
    const { getClasses, loading } = useClasses()

    useEffect(() => {
        getClasses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
            <Header />
            <main className="h-full bg-slate-300 flex  flex-col place-content-start items-center border-4 border-teal-500 rounded-md m-2 p-2 ">
                <h1 className="text-center font-bold text-3xl m-10">GymClass, tu gestor de clases profesional</h1>
                <nav className="flex flex-row flex-wrap place-content-center mb-5">
                    <Link to="/login"><button className="bg-teal-500 w-40 border-4 border-teal-500 text-white p-2 rounded-md m-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500   ">Iniciar sesión</button></Link>
                    <Link to="/register"><button className="bg-teal-500 w-40 border-4 border-teal-500 text-white p-2 rounded-md m-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500   ">Registrarse</button></Link>
                </nav>
                {
                    loading
                        ? <p className="text-2xl ">Cargando...</p>
                        : <Classes classes={classes} editable={false} managed={true} />

                }

            </main>
        </div>
    )
}
