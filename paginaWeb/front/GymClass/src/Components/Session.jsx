import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useSessions } from "../hooks/useSessions";
import { AdminUsersContext } from "../Contexts/AdminUsersContext";
import { IoDuplicate } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { IoIosOptions } from "react-icons/io";
import { DefaultWhiteButton, FullWDefaultButton, InputMovinTitle } from "./CustomTailwindElements";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

export const Session = ({ session }) => {
    const { jwt, email, role } = useContext(UserContext)
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
        const days = data.get("Días")
        if (parseInt(days) < 1) {
            setError(true)
            return
        }
        let dataTime = new Date(session.data_time)
        dataTime.setDate(dataTime.getDate() + parseInt(days))
        const res = await createSession({ uuidClass: session.UUID_Class, dataTime: dataTime, instructorEmail: session.instructorEmail, jwt })
        if (!res) {
            toast.error('Error.La fecha a duplicar es inválida ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setError(true)
            return
        }
        toast.success('Sesión duplicada con éxito', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setError(false)
        getSessions({ uuidClass: session.UUID_Class, jwt })
        setDup(false)
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        const res = await deleteSession({ uuidClass: session.UUID_Class, dataTime: session.data_time, jwt })
        if (res) {
            toast.success('Sesión borrada con éxito', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
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
            toast.success('Sesión editada con éxito', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setEdit(false)
            getSessions({ uuidClass: session.UUID_Class, jwt })
        }
    }
    return (
        <>
            <div className="bg-[#1C1917] text-center w-11/12 lg:w-72 border-gray-500 border rounded-lg h-auto flex flex-col items-center justify-center hover:border-green-500 transition duration-200 ease-in-out hover:cursor-pointer relative p-8 gap-2 overflow-hidden"
            >

                <p >{((new Date(session.data_time)).toLocaleString('es-ES', options)).charAt(0).toUpperCase() + ((new Date(session.data_time)).toLocaleString('es-ES', options)).slice(1)}</p>
                <p >Clientes inscritos: {session._count.session_client}</p>
                <p className="text-xs">{session.instructorEmail}</p>
                {
                    !location.pathname.includes("managed") && role?.toLowerCase() === 'i' &&
                    <section className="flex flex-col items-center">
                        <ImCross className="absolute top-1 right-[1rem] bg-transparent text-white rounded-md m-0 p-0 w-3 transition duration-200 ease-in-out hover:text-red-600"
                            onClick={handleDeleteClick}
                            data-tooltip-id={"delete"} />


                        <IoDuplicate className="absolute top-1 right-8 bg-transparent text-white rounded-md m-0 p-0 w-4 hover:text-green-500 transition duration-200 ease-in-out"
                            onClick={() => setDup(!dup)}
                            data-tooltip-id={"duplicate"} />
                        {
                            dup ?
                                <form className="w-full gap-2 flex flex-col items-center p-2 rounded-lg mt-2">
                                    <InputMovinTitle name="Días" type="number" />
                                    {error && <p className="text-red-500">Error</p>}
                                    <DefaultWhiteButton text={"Duplicar"} handleClick={handleDuplicationClick} />
                                </form>
                                : null
                        }
                    </section>
                }
                {
                    location.pathname.includes("managed") && role?.toLowerCase() === 'i' &&
                    <FullWDefaultButton text={"Ver"} handleClick={handleClick} />
                }

                {
                    !location.pathname.includes("managed") && role?.toLowerCase() === 'i' &&
                    <IoIosOptions className="absolute top-1 right-[3.2rem] bg-transparent text-white rounded-md m-0 p-0 w-4 hover:text-green-500 transition duration-200 ease-in-out"
                        onClick={() => setEdit(!edit)}
                        data-tooltip-id={"edit"}
                    />
                }
                {
                    edit &&
                    <form className="w-full gap-2 flex flex-col items-center p-2 rounded-lg mt-2" onSubmit={handleSubmit}>
                        <select name="Instructor"
                            className="border border-green-500 w-full h-10 p-1 rounded-md m-0 text-center bg-transparent"
                        >
                            {
                                instructors.map((instructor, index) => {
                                    return <option className="text-center rounded-lg border border-green-500 bg-[#09090B]" key={index} value={instructor.email}>{instructor.email}</option>
                                })
                            }
                        </select>
                        <DefaultWhiteButton text={"Cambiar"} />
                    </form>
                }

            </div>
            <Tooltip
                id={"delete"}
                place="top"
                className="h-auto max-w-xs border-none"
                content={"Borrar"}
            />
            <Tooltip
                id={"duplicate"}
                place="top"
                className="h-auto max-w-xs border-none"
                content={"Duplicar"}
            />
            <Tooltip
                id={"edit"}
                place="top"
                className="h-auto max-w-xs border-none"
                content={"Editar"}
            />
        </>
    )
}
