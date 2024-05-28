import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useSessionClients } from "../../hooks/useSessionClients";
import { useSessions } from "../../hooks/useSessions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast.error('Error. No ha sido posible inscribirle', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setIsEnrolledState(false)
            return
        }
        toast.success('Inscrito correctamente', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        getSessions({ uuidClass, jwt })
        setIsEnrolledState(true)

    }
    const handleUnenrollClick = async () => {
        const dataTime = session.data_time
        const uuidClass = session.UUID_Class
        const clientEmail = email

        const res = await unenrollClientToSession({ jwt, dataTime, uuidClass, clientEmail })

        if (!res) {
            toast.error('Error. No ha sido posible desinscribirle', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setIsEnrolledState(true)
            return
        }
        toast.success('Desinscrito correctamente', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
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
            
            <div className="bg-[#1C1917] text-center w-11/12 lg:w-72 border-gray-500 border rounded-lg h-auto flex flex-col items-center justify-center hover:border-green-500 transition duration-200 ease-in-out hover:cursor-pointer relative p-8 gap-2 overflow-hidden"
            >

                <p >{((new Date(session.data_time)).toLocaleString('es-ES', options)).charAt(0).toUpperCase() + ((new Date(session.data_time)).toLocaleString('es-ES', options)).slice(1)}</p>
                <p >Clientes inscritos: {session._count.session_client}</p>
                <p className="text-xs">{session.instructorEmail}</p>
                {!validated && <p className="text-xs text-red-500">No estás validado</p>}
                {
                    !isEnrolledState
                        ?
                        <button className="bg-white w-auto min-w-52 h-10 text-black p-1 rounded-md  hover:bg-gray-300 ease-in-out duration-200 border border-white"
                            disabled={!validated}
                            onClick={handleClick}
                        >
                            Inscribirse
                        </button>
                        : <button className="bg-red-600 w-auto min-w-52 h-10 text-white p-1 rounded-md  hover:bg-red-900 ease-in-out duration-200 border border-white"
                            disabled={!validated}
                            onClick={handleUnenrollClick}
                        >
                            Desinscribirse
                        </button>
                }

            </div>
        </>
    )
}
