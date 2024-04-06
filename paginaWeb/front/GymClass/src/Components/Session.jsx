import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useSessions } from "../hooks/useSessions";
import { AdminUsersContext } from "../Contexts/AdminUsersContext";
import { IoDuplicate } from "react-icons/io5";

export const Session = ({ session }) => {
    const { jwt, email,role } = useContext(UserContext)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'

    };

    const [error, setError] = useState(false)
    const { deleteSession } = useSessions()
    const navigate = useNavigate()

    const { instructors } = useContext(AdminUsersContext)
    const [edit, setEdit] = useState(false)
    const [dup, setDup] = useState(false)

    const { createSession, getSessions, updateSession } = useSessions()

    const location = useLocation()

    const handleClick = (e) => {
        e.preventDefault()
        if (!jwt) navigate("/login")
        if (email === session.instructorEmail && location.pathname.includes("managed")) {
            navigate(`${location.pathname}/${session.data_time}`)
        }
    }

    // TODO: AÑADIR GESTIÓN DE ERRORES
    const handleDuplicationClick = async (e) => {
        e.preventDefault()
        const form = e.target.form
        const data = new FormData(form)
        const days = data.get("days")
        if(parseInt(days) < 1){
            setError(true)
            return
        }
        let dataTime = new Date(session.data_time)
        dataTime.setDate(dataTime.getDate() + parseInt(days))
        const res = await createSession({ uuidClass: session.UUID_Class, dataTime: dataTime, instructorEmail: session.instructorEmail, jwt })
        if (!res) {
            setError(true)
            return
        }
        setError(false)
        getSessions({ uuidClass: session.UUID_Class, jwt })
        setDup(false)
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        const res = await deleteSession({ uuidClass: session.UUID_Class, dataTime: session.data_time, jwt })
        if (res) {
            getSessions({ uuidClass: session.UUID_Class, jwt })
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const instructorEmail = e.target.Instructor.value
        if (instructorEmail === session.instructorEmail) {
            setEdit(false)
            return
        }
        const res = await updateSession({ uuidClass: session.UUID_Class, dataTime: session.data_time, instructorEmail, jwt })
        if (res) {
            setEdit(false)
            getSessions({ uuidClass: session.UUID_Class, jwt })
        }
    }
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
                    !location.pathname.includes("managed") && role?.toLowerCase() === 'i' &&
                    <section className="flex flex-col items-center">
                        <button className="absolute top-1 right-2 bg-transparent text-white rounded-md m-0 p-0 hover:bg-red-600"
                            onClick={handleDeleteClick}>
                            ❌
                        </button>
                        <button className="absolute top-2 right-8"
                            onClick={() => setDup(!dup)}
                        >
                            <IoDuplicate className="hover:text-gray-400 ease-out transition-all duration-100" />
                        </button>
                        {
                            dup ?
                                <form>
                                    <input type="number" min="1" name="days" className="text-black " placeholder="nº días a adelantar" />
                                    {error && <p className="text-red-500">Error</p>}
                                    <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                                        onClick={handleDuplicationClick}
                                    >
                                        Click
                                    </button>
                                </form>
                                : null
                        }
                    </section>
                }
                {
                    location.pathname.includes("managed") && role?.toLowerCase() === 'i' &&
                    <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                        onClick={handleClick}>
                        Detalles
                    </button>
                }

                {
                    !location.pathname.includes("managed") && role?.toLowerCase() === 'i' &&
                    <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                        onClick={() => setEdit(!edit)}>
                        🛠
                    </button>
                }
                {
                    edit &&
                    <form onSubmit={handleSubmit}>
                        <select name="Instructor"
                            className="border-2 border-teal-500  w-11/12 h-10 p-1 rounded-md m-0 text-black"
                        >
                            {
                                instructors.map((instructor, index) => {
                                    return <option key={index} value={instructor.email}>{instructor.email}</option>
                                })
                            }
                        </select>
                        <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                        >
                            Editar
                        </button>
                    </form>
                }

            </div>
        </>
    )
}
