import { Link } from "react-router-dom"
import { Header } from "./Header"

export const LandingPage = () => {
    return (
        <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
            <Header />
            <main className="h-full bg-slate-300 flex  flex-col place-content-start items-center border-4 border-teal-500 rounded-md m-2 p-2 ">
                <h1 className="text-center font-bold text-3xl m-10">GymClass, tu gestor de clases profesional</h1>
                <nav className="flex flex-row flex-wrap place-content-center mb-5">
                    <Link to="/login"><button className="bg-teal-500 w-40 border-4 border-teal-500 text-white p-2 rounded-md m-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500   ">Iniciar sesión</button></Link>
                    <Link to="/register"><button className="bg-teal-500 w-40 border-4 border-teal-500 text-white p-2 rounded-md m-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500   ">Registrarse</button></Link>
                </nav>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 w-auto">
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>
                    <div className="w-60 h-60 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">placehodlder de las clases que se verán</div>

                </section>

            </main>
        </div>
    )
}
