import { useContext, useEffect } from "react"
import { useClasses } from "../../hooks/useClasses"
import { Header } from "../Header"
import { ClassesContext } from "../../Contexts/ClassesContext"
import { Classes } from "../Classes/Classes"

export const ClassesManagement = () => {

  const { classes } = useContext(ClassesContext)

  const { getClasses, loading } = useClasses()

  useEffect(() => {
    getClasses()
  }, [])


  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
      <Header />
      <main className="h-full bg-slate-300 flex flex-col items-center w-full border-4 border-teal-500 rounded-md m-2 p-2 ">
        <h1 className="text-4xl m-2">Gestión de Clases</h1>
        <div className="flex flex-col items-center text-center w-full">
          <button onClick={() => { null }}
            className="bg-teal-500 m-1 w-[200px] h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">
            🚧 Añadir clase 🚧{/*TODO*/}
          </button>
          {
            loading
              ? <p className="text-2xl ">Cargando...</p>
              : <Classes classes={classes} editable={true} />

          }
        </div>
      </main>
    </div>
  )
}
