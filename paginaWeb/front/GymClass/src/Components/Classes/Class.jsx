import { IoIosOptions } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { Tooltip } from "react-tooltip";
import { UserContext } from "../../Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useClasses } from "../../hooks/useClasses";
import { convertFile } from "../../utils";
import { FullWDefaultButton, InputMovinTitleWValue } from "../CustomTailwindElements";
import { toast } from "react-toastify";
import { DeleteModal } from "../DeleteModal";

export const Class = ({ c, editable, managed }) => {
    const { jwt, email, role } = useContext(UserContext)
    const [editar, setEditar] = useState(false)
    const [name, setName] = useState(c.name)
    const [description, setDescription] = useState(c.description)
    const [duration, setDuration] = useState(c.duration)
    const [maxCapacity, setMaxCapacity] = useState(c.max_Capacity)
    const [verModal, setVerModal] = useState(false)

    const { updateClass, nameError, descriptionError, photoError, maxCapacityError, durationError, getInstructorClasses, deleteClass } = useClasses()

    const navigate = useNavigate()

    const location = useLocation()
    const handleClick = (e) => {
        e.preventDefault()
        if (!jwt) navigate("/login")

        switch (role.toLowerCase()) {
            case "i":
                if (location.pathname === '/' && email === c.instructorEmail) {
                    navigate(`/instructor/${c.UUID_Class}`)
                } else if (email === c.instructorEmail && !managed) {
                    navigate(`${location.pathname}/${c.UUID_Class}`)
                } else if (managed) {
                    navigate(`${location.pathname}/managed/${c.UUID_Class}`)
                }
                break
            case "c":
                navigate(`/client/${c.UUID_Class}`)
                break

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)

        let photo = data.get("photo")
        if (!photo.name) {
            photo = c.photo.split(",")[1]
        } else {
            photo = (await convertFile(photo)).split(",")[1]
        }
        const res = await updateClass({ name, photo, description, maxCapacity, duration, jwt, UUIDClass: c.UUID_Class, instructorEmail: email })
        if (res) {
            toast.success('Clase editada con éxito', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setEditar(false)
            getInstructorClasses({ jwt })
        }
    }

    const handleDeleteClick = async () => {
        const res = await deleteClass({ uuidClass: c.UUID_Class, jwt })
        if (res) {
            toast.success('Clase borrada con éxito', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getInstructorClasses({ jwt })
        }
    }

    return (
        <>

            <DeleteModal textoEntrada={'Clase'} verModal={verModal} setVerModal={setVerModal} handleDelete={handleDeleteClick} message="Está seguro de que quiere borrar la clase? Esto borrará todo lo relacionado con esta" />

            <div className="flex flex-col items-center border w-11/12 md:w-10/12 lg:min-h-[570px] lg:w-auto border-gray-500 bg-transparent m-2 rounded-md p-2  transition duration-200 ease-in-out relative text-white hover:cursor-pointer hover:text-green-500 hover:border-green-500">
                <h1 className="font-bold text-3xl m-2 max-w-60 lg:max-w-max underline hover:text-green-700 overflow-hidden text-center transition duration-200 ease-in-out"
                    onClick={handleClick}>{c.name}</h1>
                {managed
                    ? null
                    : <ImCross className="absolute top-1 right-[1rem] bg-transparent text-white rounded-md m-0 p-0 w-3 transition duration-200 ease-in-out hover:text-red-600"
                        onClick={() => setVerModal(!verModal)} />
                }
                <img src={c.photo.length > 50 ? c.photo : "https://picsum.photos/300/300"} alt={c.description} className="aspect-square w-11/12 lg:w-96 rounded-lg border-gray-500 border transition duration-100 ease-in-out relative text-white hover:cursor-pointe hover:border-green-500"></img>

                <section className="flex flex-col w-11/12 lg:w-96 justify-center items-center text-center m-4 p-4 bg-[#09090B] border border-gray-500 rounded-lg transition duration-100 ease-in-out relative text-white hover:cursor-pointe hover:border-green-500">
                    {jwt
                        ?
                        <p className="overflow-hidden w-11/12"
                            data-tooltip-id={c.UUID_Class + c.instructorEmail}>
                            {c.instructorEmail}
                        </p>
                        : null
                    }
                    <div className="flex flex-col md:flex-row w-full justify-around ">
                        <p>Duración:{c.duration}&apos;</p>
                        <p>Aforo máximo:{c.max_Capacity}</p>
                    </div>
                </section>
                {
                    editable
                        ? <IoIosOptions className="absolute top-1 right-8 bg-transparent text-white rounded-md m-0 p-0 w-4 hover:text-green-500 transition duration-200 ease-in-out"
                            onClick={() => setEditar(!editar)}
                        />

                        : null
                }
                {
                    editar ? <form name="editUserForm"
                        id="editUserForm"
                        className="flex flex-col items-center w-10/12  md:w-auto lg:w-full m-2 gap-4 p-2 text-white text-center bg-[#1C1917] border border-gray-500 rounded-lg"
                        onSubmit={handleSubmit}
                    >
                        <InputMovinTitleWValue name="Nombre"
                            type="text"
                            value={name}
                            handleChange={(e) => setName(e.target.value)} />

                        {
                            nameError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{nameError}</div>
                                : null
                        }
                        <input type="file"
                            name="photo"
                            accept="image/*"
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-500 hover:file:cursor-pointer"
                        />
                        {
                            photoError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{photoError}</div>
                                : null
                        }
                        <InputMovinTitleWValue name="Descripción"
                            type="text"
                            value={description}
                            handleChange={(e) => setDescription(e.target.value)} />

                        {
                            descriptionError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{descriptionError}</div>
                                : null
                        }

                        {
                            
                        }
                        <InputMovinTitleWValue name="Capacidad máxima"
                            type="number"
                            min={1}
                            value={maxCapacity}
                            handleChange={(e) => setMaxCapacity(parseInt(e.target.value))}
                        />

                        {
                            maxCapacityError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{maxCapacityError}</div>
                                : null
                        }

                        <InputMovinTitleWValue name="Duración"
                            type="number"
                            min={1}
                            value={duration}
                            handleChange={(e) => setDuration(parseInt(e.target.value))}
                        />
                        {
                            durationError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{durationError}</div>
                                : null
                        }

                        <FullWDefaultButton text="Guardar" />

                    </form>
                        : null
                }
            </div>
            <Tooltip
                id={c.UUID_Class + c.instructorEmail}
                place="bottom"
                className="h-auto max-w-xs"
                content={c.instructorEmail}
            />
        </>
    )
}
