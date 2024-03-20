import { useContext, useState } from "react"
import { createSessionService, sessionsService } from "../Services/sessionsService"
import { SessionsContext } from "../Contexts/SessionsContext"
import { sessionDateValidation, sessionInstructorValidation } from "../Validations"

export const useSessions = () => {

    const { setSessions } = useContext(SessionsContext)

    const [dateError, setDateError] = useState("")
    const [instructorEmailError, setInstructorEmailError] = useState("")

    const getSessions = async ({ uuidClass, jwt }) => {
        try {
            const res = await sessionsService({ uuidClass, jwt })
            setSessions(res)

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

    return {
        createSession,
        getSessions,
        dateError,
        instructorEmailError,
    }
}
