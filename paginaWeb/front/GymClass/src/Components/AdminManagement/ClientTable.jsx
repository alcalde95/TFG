import { ClientRow } from "./ClientRow"

const ClientsTable = ({ clients }) => {

    return (
        <table className="w-full h-full border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Validado</th>
                    <th>Acciones</th>
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