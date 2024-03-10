import { useState } from "react";
import { createContext } from "react";

export const ClassesContext = createContext()

export const ClassesContextProvider = ({ children }) => {
    const [classes, setClasses] = useState([])

    return <ClassesContext.Provider value={{
        classes,
        setClasses,
    }}>
        {children}
    </ClassesContext.Provider>
}
