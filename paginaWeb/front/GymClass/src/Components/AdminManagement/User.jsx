import { useState } from "react"
import { useUserManagement } from "../../hooks/useUserManagement"
import { DefaultButton, DefaultRedButton, FullWDefaultWhiteButton, InputMovinTitle } from "../CustomTailwindElements"


export const User = ({ user }) => {

    const { deleteUser, editUser } = useUserManagement()
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



    return (
        <li key={user.email} className="w-full h-full border-gray-500 border rounded-md p-2 text-center bg-[#1C1917] text-white ">
            <p className="overflow-hidden">{user.email}</p>
            <div className="flex flex-col  md:flex-row md:flex-wrap items-center justify-center gap-2">
                <DefaultButton handleClick={() => setShowEdit(!showEdit)} text="Editar" />

                {
                    showEdit
                        ? <form name="editUserForm"
                            className="flex flex-col items-center w-10/12  md:w-full  m-2 gap-4 p-2 text-white bg-[#09090B] border border-gray-500 rounded-lg"
                            onSubmit={(e) => handleSubmit({ e, email: user.email, defaultPassword: user.password, defaultRole: user.role })}
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
                <DefaultRedButton handleClick={() => deleteUser({ email: user.email, role: user.role })} text="Eliminar" />

            </div>
        </li>
    )
}
