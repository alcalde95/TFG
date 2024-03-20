import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createSessionService, sessionsService } from "../../Services/sessionsService"
import { Header } from "../Header"
import { Sessions } from "../Sessions"
import { classService } from "../../Services/classService"
import { ClassHeaderInfo } from "../Classes/ClassHeaderInfo"
import { UserContext } from "../../Contexts/UserContext"

export const SessionsManagement = () => {
  const [sessions, setSessions] = useState([])
  const [headerClass, setHeaderClass] = useState({})
  const [show, setShow] = useState(false)
  const { jwt } = useContext(UserContext)
  const params = useParams()

  const getSessionss = async ({ classId, jwt }) => {
    try {
      const res = await sessionsService({ classId, jwt })
      setSessions(res)
    } catch (e) {
      console.error(e.message)
    }
  }
  const getHeaderClass = async ({ classId, jwt }) => {
    try {
      const res = await classService({ classId, jwt })
      setHeaderClass(res)
    } catch (e) {
      console.error(e.message)
    }
  }

  //TODO: extrae el código de esta clase y componentizarla más

  useEffect(() => {
    const { classId } = params
    getSessionss({ classId, jwt })
    getHeaderClass({ classId, jwt })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const date = data.get("Date")
    const instructor = data.get("Instructor")
    console.log(date, instructor)
    try{
      await createSessionService  ({ uuidClass: params.classId, dataTime:date, instructorEmail:instructor, jwt })
    }catch(e){
      console.error(e.message)
    }
  }

  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
      <Header />
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        {
          headerClass && <ClassHeaderInfo headerClass={headerClass} />
          
        }
      </section>
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        <h1 className="text-4xl m-2">Sesiones</h1>
        <button className="bg-teal-500 w-40 h-10 border-2 border-teal-500 text-white rounded-md hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
          onClick={() => setShow(!show)}>Añadir sesión</button>
        {
          show
            ? <form className="flex flex-col items-center md:grid md:grid-cols-3 w-80 md:w-full border-2 border-teal-500 bg-gray-400 m-2 rounded-md gap-4 p-2 shadow-[2px_2px_5px_0px] shadow-gray-800"
            onSubmit={handleSubmit}>
              <p>Fecha clase:<input type="datetime-local" name="Date"/></p>
              <input type="text" placeholder="Instructor a cargo" name="Instructor" />
              <button type="submit" className="bg-teal-500 w-40 h-10 border-2 border-teal-500 text-white rounded-md hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Añadir</button>
            </form>
            : null
        }

        {
          sessions && <Sessions sessions={sessions} />
        }
      </section>

    </div>
  )
}

