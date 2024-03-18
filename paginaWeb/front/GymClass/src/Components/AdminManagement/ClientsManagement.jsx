import { useContext, useEffect } from "react"
import { Header } from "../Header"
import { AdminUsersContext } from "../../Contexts/AdminUsersContext"
import { ClientTable } from "./ClientTable"
import { useUserManagement } from "../../hooks/useUserManagement"

export const ClientsManagement = () => {
    const { clients } = useContext(AdminUsersContext)
    const { getUsers } = useUserManagement()
    useEffect(() => {
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
            <Header />
            <section className="h-full bg-slate-300 flex flex-col items-center border-4 border-teal-500 rounded-md m-2 p-2">
                <h1 className="text-4xl m-2">Clientes</h1>

                {
                    <ClientTable clients={clients} />
                }
            </section>

        </div>
    )
}

