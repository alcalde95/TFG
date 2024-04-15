import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useSessionClients } from "../../hooks/useSessionClients";
import { useSessions } from "../../hooks/useSessions";

export const ClientSessionCard = ({ session, validated }) => {
    const { jwt, email } = useContext(UserContext)

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'

    };

    const { enrollClientToSession, unenrollClientToSession, isEnrolled } = useSessionClients()
    const { getSessions } = useSessions()

    const [isEnrolledState, setIsEnrolledState] = useState(false)

    const handleClick = async () => {
        const dataTime = session.data_time
        const uuidClass = session.UUID_Class
        const clientEmail = email

        const res = await enrollClientToSession({ jwt, dataTime, uuidClass, clientEmail })

        if (!res) {
            alert('No se ha podido inscribir')
            setIsEnrolledState(false)
            return
        }
        alert('Inscrito correctamente')
        getSessions({ uuidClass, jwt })
        setIsEnrolledState(true)

    }
    const handleUnenrollClick = async () => {
        const dataTime = session.data_time
        const uuidClass = session.UUID_Class
        const clientEmail = email

        const res = await unenrollClientToSession({ jwt, dataTime, uuidClass, clientEmail })

        if (!res) {
            alert('No se ha podido inscribir')
            setIsEnrolledState(true)
            return
        }
        alert('Desinscrito correctamente')
        getSessions({ uuidClass, jwt })
        setIsEnrolledState(false)

    }

    useEffect(() => {
        const isEnrolledFunction = async () => {
            const dataTime = session.data_time
            const uuidClass = session.UUID_Class
            const clientEmail = email
            const res = await isEnrolled({ jwt, dataTime, uuidClass, clientEmail })
            setIsEnrolledState(res)
        }
        isEnrolledFunction()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="bg-slate-400 text-center w-11/12 lg:w-72 border-white border-2 rounded-lg h-auto
                        flex flex-col items-center justify-center 
                        hover:bg-slate-700 hover:text-white 
                        transition duration-200 ease-in-out hover:cursor-pointer
                        relative
                        p-8
                        gap-4
                        overflow-hidden"
            >

                <p >{((new Date(session.data_time)).toLocaleString('es-ES', options)).charAt(0).toUpperCase() + ((new Date(session.data_time)).toLocaleString('es-ES', options)).slice(1)}</p>
                <p >Clientes inscritos: {session._count.session_client}</p>
                <p >{session.instructorEmail}</p>
                {
                    !isEnrolledState
                        ? <button className="bg-teal-500 w-auto h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500 "
                            disabled={!validated}
                            onClick={handleClick}
                        >
                            Inscribirse
                        </button>
                        : <button className="bg-red-600 w-auto h-10 border-2 border-black text-white p-1 rounded-md mr-2  hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                            disabled={!validated}
                            onClick={handleUnenrollClick}
                        >
                            DesInscribirse
                        </button>
                }

            </div>
        </>
    )
}
