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
        <div className="w-full min-w-80 min-h-screen flex flex-col items-center gap-2">
            <Header />
            <section className="h-full flex flex-col border border-gray-500 rounded-md p-2 w-11/12 max-w-7xl text-white">
                <h1 className="text-4xl m-2">Clientes</h1>

                {
                    <ClientTable clients={clients} />
                }
            </section>

        </div>
    )
}

