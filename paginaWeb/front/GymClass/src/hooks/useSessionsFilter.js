import { useState } from "react"

export const useSessionsFilter = () => {

    const [filtered, setFiltered] = useState(true)

    const filterSessions = ({ sessions }) => {

        if (!filtered) return sessions
        return sessions.filter(session => {

            return (new Date(session.data_time) >= new Date((new Date()).getTime() - 1000*60*60))
        }
        )
    }

    return { filtered, setFiltered, filterSessions }
}