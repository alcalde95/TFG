import { ClientSessionCard } from "./ClientSessionCard"

const ListOfSessions = ({ sessions,validated }) => {
    
    return (
        <ul className="flex flex-col justify-center items-center sm:grid sm:grid-cols-2 lg:grid-cols-3  gap-4 p-2 w-full place-items-center max-w-7xl ">
            {
                sessions.map((session) => (<ClientSessionCard key={session.data_time} session={session} validated = {validated}/>))
            }
        </ul>
    )
}

const NoSessions = () => {
    return (
        <p className="text-center text-xl">No hay sesiones </p>
    )
}

export const ClientSessions = ({ sessions,validated}) => {
    const hasSessions = sessions?.length > 0
    return (

        hasSessions
            ? <ListOfSessions sessions={sessions} validated = {validated}/>
            : <NoSessions  />

    )
}