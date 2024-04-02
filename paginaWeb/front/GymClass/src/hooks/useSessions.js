import { useContext, useState } from "react"
import { createSessionService, deleteSessionService, sessionService, sessionsService, updateSessionService } from "../Services/sessionsService"
import { SessionsContext } from "../Contexts/SessionsContext"
import { sessionDateValidation, sessionInstructorValidation } from "../Validations"
import { getAllInstructorsService } from "../Services/usersService"
import { AdminUsersContext } from "../Contexts/AdminUsersContext"
import { SessionContext } from "../Contexts/SessionContext"

export const useSessions = () => {

    const { setSessions,
        setMondaySessions,
        setTuesdaySessions,
        setWednesdaySessions,
        setThursdaySessions,
        setFridaySessions,
        setSaturdaySessions,
        setSundaySessions
    } = useContext(SessionsContext)

    const { setSession } = useContext(SessionContext)

    const [dateError, setDateError] = useState("")
    const [instructorEmailError, setInstructorEmailError] = useState("")
    const { instructors, setInstructors } = useContext(AdminUsersContext)
    const getSessions = async ({ uuidClass, jwt }) => {
        try {
            const res = await sessionsService({ uuidClass, jwt })
            setSessions(res)
            setMondaySessions(res.filter(session => (new Date(session.data_time)).getDay() === 1))
            setTuesdaySessions(res.filter(session => (new Date(session.data_time)).getDay() === 2))
            setWednesdaySessions(res.filter(session => (new Date(session.data_time)).getDay() === 3))
            setThursdaySessions(res.filter(session => (new Date(session.data_time)).getDay() === 4))
            setFridaySessions(res.filter(session => (new Date(session.data_time)).getDay() === 5))
            setSaturdaySessions(res.filter(session => (new Date(session.data_time)).getDay() === 6))
            setSundaySessions(res.filter(session => (new Date(session.data_time)).getDay() === 0))


        } catch (e) {
            console.error(e.message)
        }
    }

    const getSession = async ({ uuidClass, dataTime, jwt }) => {
        try {
            const res = await sessionService({ uuidClass, dataTime, jwt })
            setSession(res)
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

    const getManagedSessions = async ({ uuidClass, jwt, instructorEmail }) => {
        try {
            const res = await sessionsService({ uuidClass, jwt })
            const filteredSessions = res.filter(session => session.instructorEmail === instructorEmail)
            setSessions(filteredSessions)
            setMondaySessions(filteredSessions.filter(session => (new Date(session.data_time)).getDay() === 1))
            setTuesdaySessions(filteredSessions.filter(session => (new Date(session.data_time)).getDay() === 2))
            setWednesdaySessions(filteredSessions.filter(session => (new Date(session.data_time)).getDay() === 3))
            setThursdaySessions(filteredSessions.filter(session => (new Date(session.data_time)).getDay() === 4))
            setFridaySessions(filteredSessions.filter(session => (new Date(session.data_time)).getDay() === 5))
            setSaturdaySessions(filteredSessions.filter(session => (new Date(session.data_time)).getDay() === 6))
            setSundaySessions(filteredSessions.filter(session => (new Date(session.data_time)).getDay() === 0))
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

    const updateSession = async ({ uuidClass, dataTime, instructorEmail, jwt }) => {
        try {
            await updateSessionService({ uuidClass, dataTime, instructorEmail, jwt })
            return true
        } catch (e) {
            console.error(e.message)
            return false
        }
    }
    const deleteSession = async ({ uuidClass, dataTime, jwt }) => {
        try {
            await deleteSessionService({ uuidClass, dataTime, jwt })
            return true
        } catch (e) {
            console.error(e.message)
            return false
        }
    }

    return {
        createSession,
        getSessions,
        getSession,
        getInstructors,
        getManagedSessions,
        updateSession,
        deleteSession,
        dateError,
        instructorEmailError,
        instructors,
    }
}
