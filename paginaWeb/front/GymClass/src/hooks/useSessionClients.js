import { sessionsClientsService, updateSessionsClientsService } from '../Services/sessionsClientsService'
import { SessionClientsContext } from '../Contexts/SessionClientsContext'
import { useContext } from 'react'

export const useSessionClients = () => {

    const { setSessionClients } = useContext(SessionClientsContext)

    const getSessionClients = async ({ jwt, UUIDClass, date }) => {
        try {
            const res = await sessionsClientsService({ jwt, UUIDClass, date })
            setSessionClients(res)
        } catch (e) {
            console.log(e.message)
        }
    }

    const updateSessionClients = async ({ jwt, uuidClass, dataTime, clientEmail, attend, justified }) => {
        try {
            await updateSessionsClientsService({ jwt, uuidClass, dataTime, clientEmail, attend, justified })
            return true
        } catch (e) {
            console.log(e.message)
            return false;
        }
    }

    return ({
        getSessionClients,
        updateSessionClients,
    })
}
