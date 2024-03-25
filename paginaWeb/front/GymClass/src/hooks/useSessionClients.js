import { sessionsClientsService } from '../Services/sessionsClientsService'
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

    return ({
        getSessionClients,
    })
}
