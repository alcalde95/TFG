import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Header } from "./Header"
import { ClassHeaderInfo } from "./Classes/ClassHeaderInfo"
import { UserContext } from "../Contexts/UserContext"
import { useSessions } from "../hooks/useSessions"
import { SessionsContext } from "../Contexts/SessionsContext"
import { ClassesContext } from "../Contexts/ClassesContext"
import { useClasses } from "../hooks/useClasses"
import { WeekSessions } from "./WeekSessions"
import { useSessionsFilter } from "../hooks/useSessionsFilter"
import { DefaultButton } from "./CustomTailwindElements"

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

  const { filtered, setFiltered, filterSessions } = useSessionsFilter()
  const { classes } = useContext(ClassesContext)
  const { jwt, email } = useContext(UserContext)

  const { getManagedSessions } = useSessions()
  const { getClass } = useClasses()

  const params = useParams()


  const filteredMondaySessions = filterSessions({ sessions: mondaySessions })
  const filteredTuesdaySessions = filterSessions({ sessions: tuesdaySessions })
  const filteredWednesdaySessions = filterSessions({ sessions: wednesdaySessions })
  const filteredThursdaySessions = filterSessions({ sessions: thursdaySessions })
  const filteredFridaySessions = filterSessions({ sessions: fridaySessions })
  const filteredSaturdaySessions = filterSessions({ sessions: saturdaySessions })
  const filteredSundaySessions = filterSessions({ sessions: sundaySessions })


  useEffect(() => {
    const { uuidClass } = params
    getClass({ uuidClass, jwt })

    getManagedSessions({ uuidClass, jwt, instructorEmail: email })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="w-full min-w-80 min-h-screen flex flex-col items-center gap-2">
      <Header />
      {
        classes && <ClassHeaderInfo headerClass={classes} />

      }
      <section className="h-full flex flex-col items-center border border-gray-500 rounded-md p-2 w-11/12 max-w-7xl text-white">
        <h1 className="text-4xl m-2">Sesiones</h1>
        <DefaultButton handleClick={() => setFiltered(!filtered)} text={filtered ? "Sin impartir" : "Todas"} />

        {
          sessions && <WeekSessions mondaySessions={filteredMondaySessions}
            tuesdaySessions={filteredTuesdaySessions}
            wednesdaySessions={filteredWednesdaySessions}
            thursdaySessions={filteredThursdaySessions}
            fridaySessions={filteredFridaySessions}
            saturdaySessions={filteredSaturdaySessions}
            sundaySessions={filteredSundaySessions} />
        }
      </section>

    </div>
  )
}

