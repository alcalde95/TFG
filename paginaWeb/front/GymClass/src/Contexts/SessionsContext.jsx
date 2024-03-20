import { useState } from "react";
import { createContext } from "react";

export const SessionsContext = createContext()

export const SessionsContextProvider = ({ children }) => {
    const [sessions, setSessions] = useState([])

    return <SessionsContext.Provider value={{
        sessions,
        setSessions,
    }}>
        {children}
    </SessionsContext.Provider>
}
