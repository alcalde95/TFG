import { useState } from "react";
import { createContext } from "react";

export const SessionClientsContext = createContext()

export const SessionClientsContextProvider = ({ children }) => {
    const [sessionClients, setSessionClients] = useState([])

    return <SessionClientsContext.Provider value={{
        sessionClients,
        setSessionClients,
    }}>
        {children}
    </SessionClientsContext.Provider>
}
