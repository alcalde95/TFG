const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'

};

export const SessionHeaderInfo = ({session,num}) => {
    return (
        <div className="w-11/12 max-w-7xl flex flex-row flex-wrap gap-2 border border-gray-500 rounded-md bg-transparent items-end justify-evenly text-center text-white p-1">
            <p >{((new Date(session.data_time)).toLocaleString('es-ES', options)).charAt(0).toUpperCase() + ((new Date(session.data_time)).toLocaleString('es-ES', options)).slice(1)}</p>
            <p >  Clientes inscritos:{num} </p>
            <p className="overflow-hidden">{session.instructorEmail}</p>
        </div>
    )
}