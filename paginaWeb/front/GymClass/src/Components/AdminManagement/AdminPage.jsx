import { useNavigate } from "react-router-dom"
import { Header } from "../Header"

export const AdminPage = () => {
    const navigate = useNavigate()
    return (
        <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col ">
            <Header />
            <main className="h-[80vh]  flex flex-col items-center text-center ">
                <nav className="bg-slate-300 border-4 border-teal-500 rounded-md m-2 p-1 px-2 py-2 pe-0 text-right">
                    <button onClick={() => navigate('/admin/usersManagement')}
                        className="bg-teal-500 m-1 w-[200px] h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">
                        UserManagement
                    </button>
                    <button onClick={() => navigate('/admin/classesManagement')}
                        className="bg-teal-500 m-1 w-[200px] h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">
                        ClassesManagement
                    </button>
                </nav>
            </main>

        </div>
    )
}
