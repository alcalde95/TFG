import { useState } from "react";
import { createContext } from "react";

export const AdminUsersContext = createContext()

export const AdminUsersContextProvider = ({ children }) => {
    const [admins, setAdmins] = useState([])
    const [clients, setClients] = useState([])
    const [instructors,setInstructors] = useState([])

    return <AdminUsersContext.Provider value={{
        admins,
        clients,
        instructors,
        setAdmins,
        setClients,
        setInstructors,
    }}>
        {children}
    </AdminUsersContext.Provider>
}
