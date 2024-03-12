import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { sessionsService } from "../../Services/sessionsService"
import { Header } from "../Header"
import { Sessions } from "../Sessions"
import { classService } from "../../Services/classService"
import { ClassHeaderInfo } from "../Classes/ClassHeaderInfo"

export const SessionsManagement = () => {
  const [sessions, setSessions] = useState([])
  const [headerClass, setHeaderClass] = useState({})
  const params = useParams()

  const getSessionss = async ({ classId }) => {
    try {
      const res = await sessionsService({ classId })
      setSessions(res)
    } catch (e) {
      console.error(e.message)
    }
  }
  const getHeaderClass = async ({ classId }) => {
    try {
      const res = await classService({ classId })
      setHeaderClass(res)
    } catch (e) {
      console.error(e.message)
    }
  }

  //TODO: MOSTRAR INFORMACIÓN DE LA CLASE

  useEffect(() => {
    const { classId } = params
    getSessionss({ classId })
    getHeaderClass({ classId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
      <Header />
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">

        {
          headerClass && <ClassHeaderInfo headerClass={headerClass}/> 

        }
      </section>
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        <h1 className="text-4xl m-2">Sesiones</h1>

        {
          sessions && <Sessions sessions={sessions} />
        }
      </section>

    </div>
  )
}

