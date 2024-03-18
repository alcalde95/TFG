import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { UserContext } from "../../Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
export const Class = ({ c, editable }) => {
    const { jwt } = useContext(UserContext)
    
    const navigate = useNavigate()

    const location = useLocation()

    const handleClick = (e) => {
        e.preventDefault()
        if (!jwt) navigate("/login")

        navigate(`${location.pathname}/${c.UUID_Class}`)
    }
    return (
        <>
            <div className="flex flex-col items-center border-2 w-10/12 border-teal-500 bg-gray-400 m-2 rounded-md   p-2 shadow-[2px_2px_5px_0px] shadow-gray-800 hover:cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out ">
                <h1 className="font-bold text-3xl m-2 underline active:text-black hover:text-teal-500 transition-all duration-300 ease-in-out"
                    onClick={handleClick}>{c.name}</h1>
                    
                <img src={c.photo.length > 50 ? c.photo : "https://picsum.photos/300/300" } alt={c.description} className="aspect-square w-11/12 lg:w-96 rounded-lg  border-2"></img>
               
                <section className="flex flex-col w-11/12 lg:w-96 justify-center items-center text-center m-4 p-4 bg-slate-500 border-2 rounded-lg text-slate-200">
                    { jwt 
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
                        ? <button className="bg-teal-500  w-full h-10 border-2 border-teal-500 text-white rounded-md hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Editar</button>
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
