import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useSessions } from "../hooks/useSessions";
import { AdminUsersContext } from "../Contexts/AdminUsersContext";

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

    const { instructors } = useContext(AdminUsersContext)
    const [edit, setEdit] = useState(false)

    const { createSession, getSessions, updateSession } = useSessions()

    const location = useLocation()
    //TODO: REVISAR ESTO, CLARO, SI ERES EL INSTRUCTOR, TE PETA Xd(SI ENTRAS DD MIS CLASES, SINO NO PETA :D)
    const handleClick = (e) => {
        e.preventDefault()
        if (!jwt) navigate("/login")
        if (email === session.instructorEmail && location.pathname.includes("managed")) {
            navigate(`${location.pathname}/${session.data_time}`)
        }
    }
    const handleDuplicationClick = async (e) => {
        e.preventDefault()
        const form = e.target.form
        const data = new FormData(form)
        const days = data.get("days")
        let dataTime = new Date(session.data_time)
        dataTime.setDate(dataTime.getDate() + parseInt(days))
        const res = await createSession({ uuidClass: session.UUID_Class, dataTime: dataTime, instructorEmail: session.instructorEmail, jwt })
        if (!res) return
        getSessions({ uuidClass: session.UUID_Class, jwt })
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
        if( instructorEmail === session.instructorEmail ){
            setEdit(false)
            return
        }
        const res = await updateSession({ uuidClass: session.UUID_Class, dataTime: session.data_time,instructorEmail, jwt })
        if (res) {
            setEdit(false)
            getSessions({ uuidClass: session.UUID_Class, jwt })
        }
    }

    return (
        <>
            <div className="bg-slate-400 text-center w-72 border-white border-2 rounded-lg h-96
                        flex flex-col items-center justify-center 
                        hover:bg-slate-700 hover:text-white 
                        transition duration-200 ease-in-out hover:cursor-pointer
                        relative
                        p-4"
            >
                {/*TODO REVISAR ESTO*/}

                <p >{session.data_time}</p>
                <p >{((new Date(session.data_time)).toLocaleString('es-ES', options))}</p>
                <p >{session.instructorEmail}</p>
                {
                    !location.pathname.includes("managed") &&
                    <section className="flex flex-col items-center">
                        <button className="bg-red-600 text-white p-2 rounded-md m-2 w-10 h-max hover:bg-white"
                            onClick={handleDeleteClick}>
                            ❌
                        </button>
                        <form>
                            <p>Seleccione el nº dias a duplicar</p>
                            <input type="number" min="1" name="days" className="text-black" />
                            <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                                onClick={handleDuplicationClick}
                            >
                                Click
                            </button>
                        </form>
                    </section>
                }
                {
                    location.pathname.includes("managed") &&
                    <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                        onClick={handleClick}>
                        Detalles
                    </button>
                }

                {
                    !location.pathname.includes("managed") &&
                    <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                        onClick={() => setEdit(!edit)}>
                        🛠
                    </button>
                }
                {
                    edit &&
                    <form onSubmit={handleSubmit}>
                        <select name="Instructor"
                            className="border-2 border-teal-500  md:w-full h-10 p-1 rounded-md m-0 text-black"
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
