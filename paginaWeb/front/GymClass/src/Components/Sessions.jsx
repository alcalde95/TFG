import { Session } from "./Session"


const ListOfSessions = ({ sessions }) => {
    
    return (
        <ul className="flex flex-col justify-center items-center sm:grid sm:grid-cols-2 lg:grid-cols-3  gap-4 p-2 w-full place-items-center max-w-7xl ">
            {
                sessions.map((session) => (<Session key={session.data_time} session={session} />))
            }
        </ul>
    )
}

const NoSessions = () => {
    return (
        <p className="text-center text-xl">No hay sesiones </p>
    )
}

export const Sessions = ({ sessions}) => {
    const hasSessions = sessions?.length > 0
    return (

        hasSessions
            ? <ListOfSessions sessions={sessions} />
            : <NoSessions  />

    )
}