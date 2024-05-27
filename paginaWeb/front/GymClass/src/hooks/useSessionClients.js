import { enrollClientToSessionService, isEnrolledService, sessionsClientsService, unenrollClientToSessionService, updateSessionsClientsService } from '../Services/sessionsClientsService'
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

    const enrollClientToSession = async ({ jwt, dataTime, uuidClass, clientEmail }) => {
        try {
            await enrollClientToSessionService({ jwt, dataTime, uuidClass, clientEmail })
            return true
        } catch (e) {
            console.log(e.message)
            return false
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

    const unenrollClientToSession = async ({ jwt, dataTime, uuidClass, clientEmail }) => {
        try {
            await unenrollClientToSessionService({ jwt, dataTime, uuidClass, clientEmail })
            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }

    const isEnrolled = async ({ jwt, dataTime, uuidClass, clientEmail }) => {
        try {
            const res = await isEnrolledService({ jwt, dataTime, uuidClass, clientEmail })
            return res
        } catch (e) {
            console.log(e.message)
            return false
        }
    }



    return ({
        getSessionClients,
        enrollClientToSession,
        updateSessionClients,
        unenrollClientToSession,
        isEnrolled
    })
}
