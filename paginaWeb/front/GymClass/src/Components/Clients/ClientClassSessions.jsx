import { useContext, useEffect } from "react"
import { SessionsContext } from "../../Contexts/SessionsContext"
import { ClassesContext } from "../../Contexts/ClassesContext"
import { UserContext } from "../../Contexts/UserContext"
import { useClasses } from "../../hooks/useClasses"
import { useParams } from "react-router-dom"
import { Header } from "../Header"
import { ClassHeaderInfo } from "../Classes/ClassHeaderInfo"
import { useSessions } from "../../hooks/useSessions"
import { useSessionsFilter } from "../../hooks/useSessionsFilter"
import { ClientWeekSessions } from "./ClientWeekSessions"

export const ClientClassSessions = () => {


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
    const { jwt } = useContext(UserContext)

    const { getSessions } = useSessions()
    const { getClass } = useClasses()

    const { filterSessions } = useSessionsFilter()

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

        getSessions({ uuidClass, jwt })
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
                    sessions && <ClientWeekSessions mondaySessions={filteredMondaySessions}
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

