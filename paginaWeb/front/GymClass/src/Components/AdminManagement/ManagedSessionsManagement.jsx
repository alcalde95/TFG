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
import { useSessionsFilter } from "../../hooks/useSessionsFilter"

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
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
      <Header />
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        {
          classes && <ClassHeaderInfo headerClass={classes} />

        }
      </section>
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        <h1 className="text-4xl m-2">Sesiones</h1>
        <button type="submit"
          className="bg-teal-500 w-40 h-10 border-2 border-teal-500 text-white rounded-md hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
          onClick={() => setFiltered(!filtered)}
        >
          {filtered ? "Sin impartir" : "Todas"}
        </button>


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

