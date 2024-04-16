import { Link } from "react-router-dom"
import { Header } from "./Header"
import { useClasses } from "../hooks/useClasses"
import { Classes } from "./Classes/Classes"
import { useContext, useEffect } from "react"
import { ClassesContext } from "../Contexts/ClassesContext"

export const LandingPage = () => {
    const { classes } = useContext(ClassesContext)
    const { getClasses, loading } = useClasses()

    useEffect(() => {
        getClasses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="w-full min-w-80 min-h-screen flex flex-col">
            <Header />
            <main className="h-full flex flex-col place-content-start items-center m-2 p-2">
                <h1 className="text-center text-white font-bold text-3xl m-10">GymClass, tu gestor de clases profesional</h1>
                <nav className="flex flex-row flex-wrap justify-center items-center w-full gap-2">
                    <Link to="/login">
                        <button className="bg-[#09090B] w-auto min-w-52 h-10 text-white  p-1 rounded-md  hover:border-green-500 hover:text-green-500 ease-in-out duration-200 border border-gray-500">
                            Iniciar sesión
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="bg-[#09090B] w-auto min-w-52 h-10 text-white  p-1 rounded-md  hover:border-green-500 hover:text-green-500 ease-in-out duration-200 border border-gray-500">
                            Registrarse
                        </button>
                    </Link>
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
