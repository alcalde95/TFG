import { Link, useLocation, useNavigate } from "react-router-dom"
import useUser from "../hooks/useUser"
import { useContext, useEffect } from "react"
import { UserContext } from "../Contexts/UserContext"

export const Header = () => {
    const { isLogged, logout } = useUser()
    const { email, role } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => { 
        if(!isLogged && location.pathname !== '/') navigate('/login')

    }, [role, isLogged])

    return (
        <header className="bg-slate-300 border-4 border-teal-500 rounded-md m-2 p-1 px-2 py-2 pe-0 flex flex-col sm:flex-row justify-center sm:justify-between text-center gap-4">
            <div>
                <button onClick={() => navigate(-1)}
                    className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                >Volver
                </button>
            </div>
            {
                isLogged
                    ?
                    <div >
                        <span className="mr-2">{email}</span>
                        <button className="bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                            onClick={logout}
                        >Logout
                        </button>
                    </div>
                    : <Link className="bg-teal-500  h-10 border-2 border-teal-500 text-white p-1 rounded-md m-1 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500" to="/login">Login</Link>
            }

        </header>


    )
}


//borders sin color. shadcn, verde