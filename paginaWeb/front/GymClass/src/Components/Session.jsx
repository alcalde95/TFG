import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useSessions } from "../hooks/useSessions";

export const Session = ({ session }) => {
    const { jwt, email } = useContext(UserContext)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const { deleteSession } = useSessions()
    const navigate = useNavigate()

    const { getSessions } = useSessions()

    const location = useLocation()
    //TODO: REVISAR ESTO, CLARO, SI ERES EL INSTRUCTOR, TE PETA Xd(SI ENTRAS DD MIS CLASES, SINO NO PETA :D)
    const handleClick = (e) => {
        e.preventDefault()
        if (!jwt) navigate("/login")
        if (email === session.instructorEmail) {
            navigate(`${location.pathname}/${session.data_time}`)
        } else {
            alert("No eres el instructor de esta clase")
        }
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        if (email === session.instructorEmail) {
            const res = await deleteSession({ uuidClass: session.UUID_Class, dataTime: session.data_time, jwt })
            if (res) {
                getSessions({ uuidClass: session.UUID_Class, jwt })
            }
        } else {
            alert("No eres el instructor de esta clase")
        }
    }

    return (
        <>
            <div className="bg-slate-400 text-center w-72 border-white border-2 rounded-lg h-auto
                        flex flex-col items-center justify-center 
                        hover:bg-slate-700 hover:text-white 
                        transition duration-200 ease-in-out hover:cursor-pointer
                        relative"

            >
                {/*TODO REVISAR ESTO*/}

                <p >{session.data_time}</p>
                <p >{((new Date(session.data_time)).toLocaleString('es-ES', options))}</p>
                <p >{session.instructorEmail}</p>
                {
                    email === session.instructorEmail &&
                    <button className="bg-red-600 text-white p-2 rounded-md m-2 w-auto h-max hover:bg-white"
                        onClick={handleDeleteClick}>
                        ❌
                    </button>
                }
                <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                    onClick={handleClick}>
                    Detalles
                </button>
            </div>
        </>
    )
}
