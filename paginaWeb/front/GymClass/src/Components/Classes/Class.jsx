import { useContext, useState } from "react";
import { Tooltip } from "react-tooltip";
import { UserContext } from "../../Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useClasses } from "../../hooks/useClasses";
import { convertFile } from "../../utils";
export const Class = ({ c, editable }) => {
    const { jwt, email } = useContext(UserContext)
    const [editar, setEditar] = useState(false)
    const [name, setName] = useState(c.name)
    const [description, setDescription] = useState(c.description)
    const [duration, setDuration] = useState(c.duration)
    const [maxCapacity, setMaxCapacity] = useState(c.max_Capacity)

    const { updateClass, nameError, descriptionError, photoError, maxCapacityError, durationError, getInstructorClasses } = useClasses()

    const navigate = useNavigate()

    const location = useLocation()
    const handleClick = (e) => {
        e.preventDefault()
        if (!jwt) navigate("/login")

        navigate(`${location.pathname}/${c.UUID_Class}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)

        let photo = data.get("photo")
        if (!photo.name) {
            photo = c.photo.split(",")[1]
        }else{
            photo = (await convertFile(photo)).split(",")[1]
        }
        const res = await updateClass({ name, photo, description, maxCapacity, duration, jwt, UUIDClass: c.UUID_Class, instructorEmail: email })
        if (res) {
            setEditar(false)
            getInstructorClasses({jwt})
        }
    }

    return (
        <>
            <div className="flex flex-col items-center border-2 w-10/12 border-teal-500 bg-gray-400 m-2 rounded-md   p-2 shadow-[2px_2px_5px_0px] shadow-gray-800 hover:cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out ">
                <h1 className="font-bold text-3xl m-2 underline active:text-black hover:text-teal-500 transition-all duration-300 ease-in-out"
                    onClick={handleClick}>{c.name}</h1>

                <img src={c.photo.length > 50 ? c.photo : "https://picsum.photos/300/300"} alt={c.description} className="aspect-square w-11/12 lg:w-96 rounded-lg  border-2"></img>

                <section className="flex flex-col w-11/12 lg:w-96 justify-center items-center text-center m-4 p-4 bg-slate-500 border-2 rounded-lg text-slate-200">
                    {jwt
                        ?
                        <p className="overflow-hidden w-11/12"
                            data-tooltip-id={c.UUID_Class + c.instructorEmail}>
                            {c.instructorEmail}
                        </p>
                        : null
                    }
                    <div className="flex flex-col md:flex-row w-full justify-around">
                        <p>Duración:{c.duration}&apos;</p>
                        <p>Aforo máximo:{c.max_Capacity}</p>
                    </div>
                </section>
                {
                    editable
                        ? <button className="bg-teal-500  w-full h-10 border-2 border-teal-500 text-white rounded-md hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                            onClick={() => setEditar(!editar)}>
                            Editar
                        </button>
                        : null
                }
                {
                    editar ? <form name="editUserForm"
                        className="flex flex-col items-center w-10/12  md:w-auto lg:w-full m-2 gap-4 p-2 text-black text-center"
                        onSubmit={handleSubmit}
                    >
                        <input name="name"
                            className="border-2 border-teal-500 w-10/12  md:w-full h-10 p-1 rounded-md  m-0 text-center"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                        {
                            nameError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{nameError}</div>
                                : null
                        }
                        <input name="photo"
                            className="border-2 border-teal-500 w-10/12  md:w-full h-10 p-1 rounded-md  m-0 text-center"
                            type="file"
                        />
                        {
                            photoError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{photoError}</div>
                                : null
                        }
                        <input name="description"
                            className="border-2 border-teal-500 w-10/12  md:w-full h-10 p-1 rounded-md  m-0 text-center"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {
                            descriptionError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{descriptionError}</div>
                                : null
                        }
                        <input name="maxCapacity"
                            className="border-2 border-teal-500 w-10/12  md:w-full h-10 p-1 rounded-md  m-0 text-center"
                            type="number"
                            min={1}
                            value={maxCapacity}
                            onChange={(e) => setMaxCapacity(parseInt(e.target.value))}
                        />
                        {
                            maxCapacityError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{maxCapacityError}</div>
                                : null
                        }
                        <input name="duration"
                            className="border-2 border-teal-500 w-10/12  md:w-full h-10 p-1 rounded-md  m-0 text-center"
                            type="number"
                            min={1}
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                        />
                        {
                            durationError ? <div className="bg-red-600 text-white p-2 rounded-md m-2">{durationError}</div>
                                : null
                        }
                        <button className="w-full bg-teal-500 m-1 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                            type="submit"
                        >
                            Guardar
                        </button>
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
