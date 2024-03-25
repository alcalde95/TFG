import { useContext, useState } from "react"
import { createSessionService, deleteSessionService, sessionsService } from "../Services/sessionsService"
import { SessionsContext } from "../Contexts/SessionsContext"
import { sessionDateValidation, sessionInstructorValidation } from "../Validations"
import { getAllInstructorsService } from "../Services/usersService"

export const useSessions = () => {

    const { setSessions } = useContext(SessionsContext)

    const [dateError, setDateError] = useState("")
    const [instructorEmailError, setInstructorEmailError] = useState("")
    const [instructors,setInstructors] = useState([])
    
    const getSessions = async ({ uuidClass, jwt }) => {
        try {
            const res = await sessionsService({ uuidClass, jwt })
            setSessions(res)

        } catch (e) {
            console.error(e.message)
        }
    }

    const getInstructors = async ({ jwt }) => {
        try {
            const res = await getAllInstructorsService({ jwt })
            setInstructors(res)
        } catch (e) {
            console.error(e.message)
        }
    }

    const getManagedSessions = async ({ uuidClass, jwt,instructorEmail }) => {
        try {
            const res = await sessionsService({ uuidClass, jwt })
            const filteredSessions = res.filter(session => session.instructorEmail === instructorEmail)
            setSessions(filteredSessions)
        } catch (e) {
            console.error(e.message)
        }
    }

    const createSession = async ({ uuidClass, dataTime, instructorEmail, jwt }) => {

        const dateValidation = sessionDateValidation({ date: dataTime })
        const instructorValidation = sessionInstructorValidation({ instructorEmail })
        setDateError(dateValidation)
        setInstructorEmailError(instructorValidation)
        if (dateValidation || instructorValidation) {
            return false
        }

        try {
            await createSessionService({ uuidClass, dataTime, instructorEmail, jwt })
            return true
        } catch (e) {
            console.error(e.message)
            return false
        }
    }

    const deleteSession = async ({ uuidClass,dataTime,jwt }) => {
        try {
            await deleteSessionService({ uuidClass,dataTime,jwt })
            return true
        }catch(e){
            console.error(e.message)
            return false
        }
    }

    return {
        createSession,
        getSessions,
        getInstructors,
        getManagedSessions,
        deleteSession,
        dateError,
        instructorEmailError,
        instructors,
    }
}
