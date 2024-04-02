import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Header } from "../Header"
import { ClassHeaderInfo } from "../Classes/ClassHeaderInfo"
import { UserContext } from "../../Contexts/UserContext"
import { useSessions } from "../../hooks/useSessions"
import { SessionsContext } from "../../Contexts/SessionsContext"
import { ClassesContext } from "../../Contexts/ClassesContext"
import { useClasses } from "../../hooks/useClasses"
import { WeekSessions } from "../WeekSessions"

export const ManagedSessionsManagement = () => {

  const { sessions,
    mondaySessions,
    tuesdaySessions,
    wednesdaySessions,
    thursdaySessions,
    fridaySessions,
    saturdaySessions,
    sundaySessions
  } = useContext(SessionsContext)

  const { classes } = useContext(ClassesContext)
  const { jwt,email } = useContext(UserContext)

  const {  getManagedSessions } = useSessions()
  const { getClass } = useClasses()

  const params = useParams()


  useEffect(() => {
    const { uuidClass } = params
    getClass({ uuidClass, jwt })
    
    getManagedSessions({ uuidClass, jwt,instructorEmail:email })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
      <Header />
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        {
          classes && <ClassHeaderInfo headerClass={classes} />

        }
      </section>
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        <h1 className="text-4xl m-2">Sesiones</h1>
        

        {
          sessions && <WeekSessions mondaySessions={mondaySessions} tuesdaySessions={tuesdaySessions} wednesdaySessions={wednesdaySessions} thursdaySessions={thursdaySessions} fridaySessions={fridaySessions} saturdaySessions={saturdaySessions} sundaySessions={sundaySessions} />
        }
      </section>

    </div>
  )
}

