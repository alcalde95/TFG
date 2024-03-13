import { useContext, useEffect, useState } from "react"
import { Header } from "./Header"
import { classesInstructorService } from "../Services/classService"
import { UserContext } from "../Contexts/UserContext"
import { Classes } from "./Classes/Classes"
export const InstructorPage = () => {
  //TODO: CAMBIAR BACKEND PARA QUE EN VEZ DE PASAR EL EMAIL DEL INSTRUCTOR, PASE EL JWT
  const [classes, setClasses] = useState([])
  const { jwt } = useContext(UserContext)

  const getClasses = async () => {

    const res = await classesInstructorService({ jwt })
    console.log(res)
    setClasses(res)
  }

  useEffect(() => {
    getClasses()
  }, [])

  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col ">
      <Header />
      <main className="h-full bg-slate-300 flex flex-col items-center  border-4 border-teal-500 rounded-md m-2 p-2 ">
        <h1 className="text-4xl m-2 underline cursor-default">Mis Clases</h1>
        <button onClick={() =>  alert("🚧IN DEVELOPEMENT🚧") } className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Add</button>
        <div className="flex flex-col items-center text-center w-full">
          {
            classes && <Classes classes={classes} editable={true} />
          }
        </div>
      </main>
    </div>
  )
}
