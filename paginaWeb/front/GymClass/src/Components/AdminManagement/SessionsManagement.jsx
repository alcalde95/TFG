import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { sessionsService } from "../../Services/sessionsService"
import { Header } from "../Header"
import { Sessions } from "../Sessions"

export const SessionsManagement = () => {
  const [sessions, setSessions] = useState([])
  const params = useParams()
  const getSessionss = async ({ classId }) => {
    try {
      const res = await sessionsService({ classId })
      setSessions(res)
    } catch (e) {
      console.error(e.message)
    }
  }

  //TODO: MOSTRAR INFORMACIÓN DE LA CLASE

  useEffect(() => {
    const { classId } = params
    getSessionss({ classId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
      <Header />
      <section className="h-full bg-slate-300 flex flex-col items-center w-full border-4 border-teal-500 rounded-md m-2 p-2">
        <h1 className="text-4xl m-2">Sessions</h1>

        {
          sessions && <Sessions sessions={sessions}/>
        }
      </section>

    </div>
  )
}
