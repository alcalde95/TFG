import { SessionClient } from "./SessionClient"


const ListOfSessionClients = ({ sessionClients }) => {

    return (
        <table className="w-full h-full border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Attend</th>
                    <th>Justified</th>
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