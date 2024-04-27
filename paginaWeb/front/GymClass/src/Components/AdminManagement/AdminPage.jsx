import { useNavigate } from "react-router-dom"
import { Header } from "../Header"
import { DefaultButton } from "../CustomTailwindElements"

export const AdminPage = () => {
    const navigate = useNavigate()
    return (
        <div className="min-w-80 w-full min-h-screen flex flex-col gap-2 relative text-white ">
            <Header />
            <main className="h-full  flex flex-col items-center text-center ">
                <nav className=" border border-gray-500 rounded-md m-2 p-1 px-2 py-2 text-right">

                    <DefaultButton handleClick={() => navigate('/admin/usersManagement')} text="Gestión de usuarios" />


                </nav>
            </main>

        </div>
    )
}

/*
<button onClick={() => navigate('/admin/classesManagement')}
                        className="bg-teal-500 m-1 w-[200px] h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">
                        ClassesManagement
                    </button>
                    */