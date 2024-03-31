import { useContext, useEffect } from "react"
import { SessionClientsContext } from "../Contexts/SessionClientsContext"
import { Header } from "./Header"
import { ClassesContext } from "../Contexts/ClassesContext"
import { useClasses } from "../hooks/useClasses"
import { useParams } from "react-router-dom"
import { UserContext } from "../Contexts/UserContext"
import { ClassHeaderInfo } from "./Classes/ClassHeaderInfo"
import { useSessionClients } from "../hooks/useSessionClients"

export const SessionClientsManagement = () => {

  const { sessionClients } = useContext(SessionClientsContext)
  const { classes } = useContext(ClassesContext)
  const { jwt } = useContext(UserContext)

  const { getClass } = useClasses()

  const { getSessionClients,updateSessionClients } = useSessionClients()

  const params = useParams()

  useEffect(() => {
    const { uuidClass, date } = params
    getClass({ uuidClass, jwt })
    getSessionClients({ jwt, UUIDClass: uuidClass, date })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeAttend = async ({sessionClient}) => {
    const attend = !sessionClient.attend
    const res = await updateSessionClients({jwt,uuidClass:sessionClient.UUID_Class,dataTime:sessionClient.data_time,clientEmail:sessionClient.client_Email,attend,justified:sessionClient.justified})
    if(!res) return
    getSessionClients({ jwt, UUIDClass: sessionClient.UUID_Class, date:sessionClient.data_time })
  }
  const handleChangeJustified = async ({sessionClient}) => {
    const justified = !sessionClient.justified
    const res = await updateSessionClients({jwt,uuidClass:sessionClient.UUID_Class,dataTime:sessionClient.data_time,clientEmail:sessionClient.client_Email,attend:sessionClient.attend,justified:justified})
    if(!res) return
    getSessionClients({ jwt, UUIDClass: sessionClient.UUID_Class, date:sessionClient.data_time })
  }

  //TODO: COMPONENTIZAR ESTO :D
  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col ">
      <Header />
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
        {
          classes && <ClassHeaderInfo headerClass={classes} />

        }
      </section >
      <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">

        {

          sessionClients ?
            <table className="w-full h-full border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Attend</th>
                  <th>Justified</th>
                </tr>
              </thead>
              <tbody>
                {
                  //DE MOMENTO READONLY
                  sessionClients.map((sessionClient) => {
                    return (
                      <tr key={sessionClient.client_Email}>
                        <td>{sessionClient.client_Email}</td>
                        <td><input type="checkbox" checked={sessionClient.attend} onChange={() => handleChangeAttend({sessionClient})} /></td>
                        <td><input type="checkbox" checked={sessionClient.justified} onChange={() => handleChangeJustified({sessionClient})} /></td>
                        
                      </tr>
                    )

                  })
                }
              </tbody>
            </table>
            : null
        }

      </section >
    </div>
  )
}

/*
   {
      "client_Email": "client@client.client",
      "data_time": "2002-02-02T00:00:00.000Z",
      "UUID_Class": "b04bc175-34f4-4775-96aa-82e005a131fd",
      "attend": false,
      "justified": false
    } */