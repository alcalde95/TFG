import { ClientRow } from "./ClientRow"

const ClientsTable = ({ clients }) => {

    return (
        <table className="w-auto h-full text-white m-2 text-left">
            <thead className="p-2">
                <tr className="h-full border-b border-gray-500 hover:bg-[#18181A] transition ease-in-out duration-200 text-[#5A5A5F] ">
                    <th className="p-2">Email</th>
                    <th className="p-2 text-center">Validado</th>
                    <th className="p-2"></th>
                </tr>
            </thead>
            <tbody>
                {
                    clients.map((client) => (<ClientRow key={client.email} client={client} />))

                }
            </tbody>
        </table>
    )
}

const NoClients = () => {
    return (
        <p>No hay ningún cliente </p>
    )
}

export const ClientTable = ({ clients }) => {
    const hasUsers = clients?.length > 0

    return (

        hasUsers
            ? <ClientsTable clients={clients} />
            : <NoClients />

    )
}


/*
 <table className="w-full bg-black text-white">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      clients.map((client) => (
                        
                      ))
                    }
                  </tbody>
                </table>*/ 