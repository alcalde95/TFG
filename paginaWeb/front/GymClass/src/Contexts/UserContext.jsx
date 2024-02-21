import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [role, setRole] = useState(() => window.sessionStorage.getItem('role'))
    const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('jwt'))
    const [email,setEmail] = useState(() => window.sessionStorage.getItem('email'))

    return <UserContext.Provider value={{
        role,
        jwt,
        email,
        setRole,
        setJWT,
        setEmail,
    }}>
        {children}
    </UserContext.Provider>
}
