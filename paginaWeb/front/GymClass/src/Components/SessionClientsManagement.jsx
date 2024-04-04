import { useContext, useEffect } from "react"
import { SessionClientsContext } from "../Contexts/SessionClientsContext"
import { Header } from "./Header"
import { ClassesContext } from "../Contexts/ClassesContext"
import { useClasses } from "../hooks/useClasses"
import { useParams } from "react-router-dom"
import { UserContext } from "../Contexts/UserContext"
import { ClassHeaderInfo } from "./Classes/ClassHeaderInfo"
import { useSessionClients } from "../hooks/useSessionClients"
import { SessionClients } from "./SessionClients/SessionClients"
import { useSessions } from "../hooks/useSessions"
import { SessionHeaderInfo } from "./SessionHeaderInfo"
import { SessionContext } from "../Contexts/SessionContext"

export const SessionClientsManagement = () => {

  const { sessionClients } = useContext(SessionClientsContext)
  const { classes } = useContext(ClassesContext)
  const { session } = useContext(SessionContext)
  const { jwt } = useContext(UserContext)

  const { getClass } = useClasses()

  const { getSession } = useSessions()

  const { getSessionClients } = useSessionClients()

  const params = useParams()

  useEffect(() => {
    const { uuidClass, date } = params
    getClass({ uuidClass, jwt })
    getSessionClients({ jwt, UUIDClass: uuidClass, date })
    getSession({ uuidClass, dataTime: date, jwt })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col ">
      <Header />
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        {
          classes && sessionClients && <ClassHeaderInfo headerClass={classes} />

        }
      </section >
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        {
          session && <SessionHeaderInfo session={session} num={sessionClients.length} />

        }
      </section >
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">

        {

          sessionClients ?
            <SessionClients sessionClients={sessionClients} />
            : null
        }

      </section >
    </div>
  )
}