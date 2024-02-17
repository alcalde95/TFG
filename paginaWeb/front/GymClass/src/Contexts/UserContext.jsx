import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [role, setRole] = useState(() => window.sessionStorage.getItem('role'))
    const [jwt, setJWT] = useState(
        () => window.sessionStorage.getItem('jwt')
    )

    return <UserContext.Provider value={{
        role,
        jwt,
        setRole,
        setJWT
    }}>
        {children}
    </UserContext.Provider>
}
