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
        <div className=" w-full flex flex-row flex-wrap gap-2 border-2 rounded-md bg-slate-400 items-end text-center">
            <p >{((new Date(session.data_time)).toLocaleString('es-ES', options))}</p>
            <p>Clientes inscritos:{num}</p>
            <p className="overflow-hidden">{session.instructorEmail}</p>
        </div>
    )
}