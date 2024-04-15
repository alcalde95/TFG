import { useState } from 'react'
import { useUserManagement } from '../../hooks/useUserManagement'

export const ClientRow = ({ client }) => {

    const { deleteUser, editUser,validateClient } = useUserManagement()
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

    const handleChange = () => {
        const validated = client.client.validated === 'N' ? 'Y' : 'N'
        validateClient({ email: client.email, validated })
    }

    return (
        <tr key={client.id} className='border-gray-500 border-[1px] '>
            <td>{client.email}</td>
            <td><input type='checkbox' checked={client.client.validated === 'N' ? false : true} onChange={handleChange}></input></td>
            <td>
                <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                    onClick={() => deleteUser({ email: client.email, role: client.role })}>
                    Eliminar
                </button>

                <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500"
                    onClick={() => setShowEdit(!showEdit)}
                >
                    Editar
                </button>
                {
                    showEdit
                        ? <form name="editUserForm"
                            className="flex flex-col items-center w-10/12  md:w-auto lg:w-full m-2 gap-4 p-2 text-black"
                            onSubmit={(e) => handleSubmit({ e, email: client.email, defaultPassword: client.password, defaultRole: 'C' })}
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

            </td>
        </tr>
    )
}
