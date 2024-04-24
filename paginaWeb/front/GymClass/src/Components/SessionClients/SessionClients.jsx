import { SessionClient } from "./SessionClient"


const ListOfSessionClients = ({ sessionClients }) => {

    return (
        <table className="w-auto h-full text-white m-2 text-left">
            <thead className="p-2">
                <tr className="h-full border-b border-gray-500 hover:bg-[#18181A] transition ease-in-out duration-200 text-[#5A5A5F] ">
                    <th className="p-2">Email</th>
                    <th className="p-2 text-center">Attend</th>
                    <th className="p-2 text-center">Justified</th>
                </tr>
            </thead>
            <tbody>
                {
                    sessionClients.map((sessionClient) => (<SessionClient key={sessionClient.client_Email} sessionClient={sessionClient} />))
                }
            </tbody>
        </table>
    )
}

const NoSessionClients = () => {
    return (
        <p>No hay clientes inscritos </p>
    )
}

export const SessionClients = ({ sessionClients }) => {
    const hasSessions = sessionClients?.length > 0
    return (

        hasSessions
            ? <ListOfSessionClients sessionClients={sessionClients} />
            : <NoSessionClients />

    )
}