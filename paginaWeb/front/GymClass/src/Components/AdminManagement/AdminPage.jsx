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

