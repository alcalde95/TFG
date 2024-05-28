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
import useUser from "../../hooks/useUser"
import { Slide, ToastContainer } from "react-toastify"

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
    const { validated, isValidatedClient } = useUser()


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
        isValidatedClient()
        getSessions({ uuidClass, jwt })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
        <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
        <div className="w-full min-w-80 min-h-screen flex flex-col items-center gap-2">
            <Header />
            {
                classes && <ClassHeaderInfo headerClass={classes} />
                
            }
            <section className="h-full flex flex-col items-center border border-gray-500 rounded-md p-2 w-11/12 max-w-7xl text-white">

                <h1 className="text-4xl m-2">Sesiones</h1>


                {
                    sessions && <ClientWeekSessions mondaySessions={filteredMondaySessions}
                    tuesdaySessions={filteredTuesdaySessions}
                    wednesdaySessions={filteredWednesdaySessions}
                    thursdaySessions={filteredThursdaySessions}
                    fridaySessions={filteredFridaySessions}
                    saturdaySessions={filteredSaturdaySessions}
                    sundaySessions={filteredSundaySessions}
                    validated={validated} />
                }
            </section>

        </div>
                </>
    )
}

