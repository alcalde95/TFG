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
        if (!role && location.pathname !== '/') {
            navigate('/login')
            return
        }
        if (location.pathname !== '/') {
            switch (role.toLowerCase()) {
                case 'a':
                    if (!location.pathname.includes('/admin')) navigate('/admin')
                    break;
                case 'c':
                    if (!location.pathname.includes('/client')) navigate('/client')
                    break;
                case 'i':
                    if (!location.pathname.includes('/instructor')) navigate('/instructor')
                    break;
                default:
                    navigate('/');
            }
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role, isLogged])

    return (
        <header className=" bg-[#09090B] border-b border-gray-500 p-2 flex flex-col sm:flex-row justify-center items-center text-center gap-4 text-gray-400 w-full overflow-auto">
            <div className="max-w-7xl w-full flex flex-col sm:flex-row sm:justify-between">
                <nav>
                    <button onClick={() => navigate('/')}
                        className="bg-[#09090B] w-20 h-10 text-gray-400  p-1 rounded-md mr-2 hover:text-white ease-in-out duration-100"
                    >
                        Inicio
                    </button>
                    <button onClick={() => navigate(-1)}
                        className="bg-[#09090B] w-20 h-10  p-1 rounded-md mr-2 hover:text-white ease-in-out duration-200"
                    >
                        Volver
                    </button>
                </nav>
                {
                    isLogged
                        ?
                        <div >
                            <span className="mr-2">{email}</span>
                            <button className="bg-[#09090B] w-20 h-10  p-1 rounded-md mr-2 hover:text-white ease-in-out duration-200"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                        : <button><Link className="bg-[#09090B] w-20 h-10  p-1 rounded-md mr-2 hover:text-white ease-in-out duration-200"
                            to="/login">
                            Login
                        </Link></button>
                }
            </div>
        </header>


    )
}

