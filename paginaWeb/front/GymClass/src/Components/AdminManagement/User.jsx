import { useState } from "react"
import { useUserManagement } from "../../hooks/useUserManagement"
import useUser from "../../hooks/useUser"

export const User = ({ user }) => {

    const { deleteUser } = useUserManagement()
    const { editUser } = useUser()
    const [showEdit, setShowEdit] = useState(false)

    const [userEditError, setUserEditError] = useState(false)

    const handleSubmit = async ({ e, email, defaultPassword, defaultRole }) => {
        e.preventDefault()
        let password = e.target[0].value
        let role = e.target[1].value

        if (password === '') {
            password = defaultPassword
        }
        if (role === '') {
            role = defaultRole
        }
        try {
            const res = await editUser({ email, password, role })
            console.log(res, 'res')
            if (res) {
                setUserEditError(false)
                setShowEdit(false)
            }
            else {
                setUserEditError(true)
            }
        } catch (error) {

            console.log(error.message)
        }
    }



    return (
        <li key={user.email} className="w-full h-full border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">
            <p className="overflow-hidden">{user.email}</p>
            <div className="flex flex-col  md:flex-row md:flex-wrap items-center justify-center ">
                <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                    onClick={() => setShowEdit(!showEdit)}
                >
                    Editar
                </button>
                {
                    showEdit
                        ? <form name="editUserForm"
                            className="flex flex-col items-center w-10/12  md:w-auto lg:w-full m-2 gap-4 p-2 text-black"
                            onSubmit={(e) => handleSubmit({ e, email: user.email, defaultPassword: user.password, defaultRole: user.role })}
                        >
                            <input name="password"
                                className="border-2 border-teal-500 w-10/12  md:w-full h-10 p-1 rounded-md  m-0"
                                type="text"
                                placeholder="Contraseña"
                                autoComplete="new-password"
                            />
                            <select name="userType"
                                className="border-2 border-teal-500 w-10/12 md:w-full h-10 p-1 rounded-md m-0"
                            >
                                <option value="A">
                                    Administrador
                                </option>
                                <option value="C">
                                    Cliente
                                </option>
                                <option value="I">
                                    Instructor
                                </option>
                            </select>
                            {
                                userEditError ? <p className="md:col-start-2 bg-red-600 text-white p-2 rounded-md m-2">Contraseña o rol incorrecto</p> : null
                            }
                            <button className="w-full bg-teal-500 m-1 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                                type="submit"
                            >
                                Guardar
                            </button>
                        </form>
                        : null
                }
                <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                    onClick={() => deleteUser({ email: user.email, role: user.role })}>
                    Eliminar
                </button>
            </div>
        </li>
    )
}
