import { useState } from "react"

export const useSessionsFilter = () => {

    const [filtered, setFiltered] = useState(true)

    const filterSessions = ({ sessions }) => {

        if (!filtered) return sessions

        return sessions.filter(session => new Date(session.data_time) >= (new Date().setDate((new Date()).getDay() - 1))
        )
    }

    return { filtered, setFiltered, filterSessions }
}