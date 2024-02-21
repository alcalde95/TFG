import { Link } from "react-router-dom"
import useUser from "../hooks/useUser"
import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"

export const Header = () => {
    const { isLogged, logout } = useUser()

    const { email } = useContext(UserContext)

    return (
        <header className="bg-slate-300 border-4 border-teal-500 rounded-md m-2 p-1 px-2 py-2 pe-0 text-right">
            {
                isLogged
                    ?
                        <>
                            <span className="mr-2">{email}</span>
                            <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500" onClick={logout}>Logout</button>
                        </>
                    : <Link className="bg-teal-500  h-20 border-2 border-teal-500 text-white p-1 rounded-md m-1 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500" to="/login">Login</Link>
            }

        </header>


    )
}
//grid grid-cols-2 bg-slate-300 border-4 border-teal-500 rounded-md m-2 p-1 text-right