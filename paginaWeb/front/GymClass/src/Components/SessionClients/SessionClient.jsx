import { useContext } from "react"
import { useSessionClients } from "../../hooks/useSessionClients"
import { UserContext } from "../../Contexts/UserContext"

export const SessionClient = ({sessionClient}) => {
    const {jwt} = useContext(UserContext)
    const {getSessionClients,updateSessionClients} = useSessionClients()

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

    return (
        <tr key={sessionClient.client_Email}>
            <td>{sessionClient.client_Email}</td>
            <td><input type="checkbox" checked={sessionClient.attend} onChange={() => handleChangeAttend({ sessionClient })} /></td>
            <td><input type="checkbox" checked={sessionClient.justified} onChange={() => handleChangeJustified({ sessionClient })} /></td>
        </tr>
    )
}
