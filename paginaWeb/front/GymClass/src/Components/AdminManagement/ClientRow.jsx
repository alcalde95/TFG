import { useState } from 'react'
import { useUserManagement } from '../../hooks/useUserManagement'
import { FullWDefaultWhiteButton, InputMovinTitle } from '../CustomTailwindElements'
import { toast } from 'react-toastify'

export const ClientRow = ({ client }) => {

    const { deleteUser, editUser, validateClient } = useUserManagement()
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
                toast.success('Cliente actualizado con éxito', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
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
        toast.success(validated === 'Y' ? 'Cliente validado con éxito' : 'Cliente desvalidado con éxito', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    const handleDeleteUser = ({ email, role }) => {
        try {
            const res = deleteUser({ email, role })

            if (res) {
                toast.success('Usuario eliminado con éxito', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }

        } catch (e) {
            console.log(e.mmessage)
        }
    }

    return (
        <tr key={client.id} className='border-b border-gray-500 hover:bg-[#18181A] transition ease-in-out duration-200'>
            <td>{client.email}</td>
            <td className='text-center p-2'>
                <input type='checkbox' checked={client.client.validated === 'N' ? false : true} onChange={handleChange}></input>
            </td>
            <td className='text-center gap-2'>

                <button className="bg-[#09090B] w-28 h-auto text-white p-1 rounded-md  hover:border-green-500 hover:text-green-500 ease-in-out duration-200 border border-gray-500 mr-2"
                    onClick={() => setShowEdit(!showEdit)}
                >
                    Editar
                </button>
                {
                    showEdit
                        ? <form name="editUserForm"
                            className="flex flex-col items-center w-10/12  md:w-full  m-2 gap-4 p-2 text-white bg-[#09090B] border border-gray-500 rounded-lg"
                            onSubmit={(e) => handleSubmit({ e, email: client.email, defaultPassword: client.password, defaultRole: 'C' })}
                        >
                            <InputMovinTitle name='Contraseña' type={'password'} />
                            <select name="userType"
                                className="border border-green-500 w-full h-10 p-1 rounded-md m-0 text-center bg-transparent"
                            >
                                <option value="A" className="text-center rounded-lg border border-green-500 bg-[#09090B]">
                                    Administrador
                                </option>
                                <option value="C" className="text-center rounded-lg border border-green-500 bg-[#09090B]">
                                    Cliente
                                </option>
                                <option value="I" className="text-center rounded-lg border border-green-500 bg-[#09090B]">
                                    Instructor
                                </option>
                            </select>
                            {
                                userEditError ? <p className="md:col-start-2 bg-red-600 text-white p-2 rounded-md m-2">Contraseña o rol incorrecto</p> : null
                            }
                            <FullWDefaultWhiteButton text={"Guardar"} />
                        </form>
                        : null
                }
                <button className="bg-red-600 w-28  h-auto text-white p-1 rounded-md  hover:bg-red-900 ease-in-out duration-200 border border-white"
                    onClick={() => handleDeleteUser({ email: client.email, role: client.role })}>
                    Eliminar
                </button>

            </td>
        </tr>
    )
}
