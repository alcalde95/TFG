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
import { Slide, ToastContainer } from "react-toastify"

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
          classes && sessionClients && <ClassHeaderInfo headerClass={classes} />

        }
        {
          session && <SessionHeaderInfo session={session} num={sessionClients.length} />
        }
        <main className="h-full flex flex-col border border-gray-500 rounded-md p-2 w-11/12 max-w-7xl text-white">

          {

            sessionClients ?
              <SessionClients sessionClients={sessionClients} />
              : null
          }

        </main >
      </div>
    </>
  )
}