import { useState } from "react";
import { createContext } from "react";

export const SessionsContext = createContext()

export const SessionsContextProvider = ({ children }) => {
    const [sessions, setSessions] = useState([])
    const [mondaySessions, setMondaySessions] = useState([])
    const [tuesdaySessions, setTuesdaySessions] = useState([])
    const [wednesdaySessions, setWednesdaySessions] = useState([])
    const [thursdaySessions, setThursdaySessions] = useState([])
    const [fridaySessions, setFridaySessions] = useState([])
    const [saturdaySessions, setSaturdaySessions] = useState([])
    const [sundaySessions, setSundaySessions] = useState([])
    
    return <SessionsContext.Provider value={{
        sessions,
        mondaySessions,
        tuesdaySessions,
        wednesdaySessions,
        thursdaySessions,
        fridaySessions,
        saturdaySessions,
        sundaySessions,
        setSessions,
        setMondaySessions,
        setTuesdaySessions,
        setWednesdaySessions,
        setThursdaySessions,
        setFridaySessions,
        setSaturdaySessions,
        setSundaySessions

    }}>
        {children}
    </SessionsContext.Provider>
}
