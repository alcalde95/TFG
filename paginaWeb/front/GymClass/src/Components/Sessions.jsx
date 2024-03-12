import { Session } from "./Session"


const ListOfClasses = ({ sessions }) => {
    
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 p-2 w-full place-items-center">
            {
                sessions.map((session) => (<Session key={session.data_time} session={session} />))
            }
        </ul>
    )
}

const NoClasses = () => {
    return (
        <p>No hay sesiones </p>
    )
}

export const Sessions = ({ sessions}) => {
    const hasSessions = sessions?.length > 0
    return (

        hasSessions
            ? <ListOfClasses sessions={sessions} />
            : <NoClasses  />

    )
}