import { useContext, useEffect, useState } from "react"
import { Header } from "./Header"
import { classesInstructorService, createClassService } from "../Services/classService"
import { UserContext } from "../Contexts/UserContext"
import { Classes } from "./Classes/Classes"
import { InputMovinTitle } from "./CustomTailwindElements"
export const InstructorPage = () => {
  const [classes, setClasses] = useState([])
  const [ver, setVer] = useState(false)
  const { jwt, email } = useContext(UserContext)

  const getClasses = async () => {

    const res = await classesInstructorService({ jwt })
    setClasses(res)
  }

  useEffect(() => {
    getClasses()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const name = data.get("Nombre")
    const description = data.get("Descripcion")
    const photo = btoa(data.get("Imagen"))
    const duration = parseInt(data.get("Duración"))
    const maxCapacity = parseInt(data.get("Capacidad"))
    const res = await createClassService({ name, photo, description, maxCapacity, duration, instructorEmail: email })
    alert(res)
  }


  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col ">
      <Header />
      <main className="h-full bg-slate-300 flex flex-col items-center  border-4 border-teal-500 rounded-md m-2 p-2 ">
        <h1 className="text-4xl m-2 underline cursor-default">Mis Clases</h1>
        <button onClick={() => setVer(!ver)} className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Add</button>
        {
          ver
            ? <form className="w-full gap-2 flex flex-col" onSubmit={handleSubmit}>
              <InputMovinTitle name="Nombre" type="text" />
              <InputMovinTitle name="Descripcion" type="textarea" />
              <InputMovinTitle name="Imagen" type="file" />
              <InputMovinTitle name="Duración" type="number" />
              <InputMovinTitle name="Capacidad" type="text" />
              <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Crear</button>
            </form>

            : null
        }


        <div className="flex flex-col items-center text-center w-full">
          {
            classes && <Classes classes={classes} editable={true} />
          }
        </div>
      </main>
    </div>
  )
}
