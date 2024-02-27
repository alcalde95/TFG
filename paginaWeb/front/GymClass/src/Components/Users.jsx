import { useUserManagement } from "../hooks/useUserManagement"

const ListOfUsers = ({ users, role }) => {
    //preguntar a stephan o dani
    const { deleteUser } = useUserManagement()

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-2 w-full justify-between ">
            {
                users.map((user) => {
                    return <li key={user.email} className="w-full h-full border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">
                        <p>{user.email}</p>
                        <div className="flex flex-row flex-wrap justify-center ">
                            <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Editar</button>
                            <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                                onClick={() => deleteUser({ email: user.email, role })}>Delete</button>
                        </div>
                    </li>
                })

            }
        </ul>
    )
}

const NoUsers = ({ role }) => {
    return (
        <p>No hay ningún {role} </p>
    )
}

export const Users = ({ users, role }) => {
    const hasUsers = users?.length > 0

    return (

        hasUsers
            ? <ListOfUsers users={users} role={role} />
            : <NoUsers role={role} />

    )
}