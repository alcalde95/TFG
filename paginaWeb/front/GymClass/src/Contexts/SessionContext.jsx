import { useState } from "react";
import { createContext } from "react";

export const SessionContext = createContext()

export const SessionContextProvider = ({ children }) => {
    const [session, setSession] = useState({})
    
    return <SessionContext.Provider value={{
        session,
        setSession,

    }}>
        {children}
    </SessionContext.Provider>
}
