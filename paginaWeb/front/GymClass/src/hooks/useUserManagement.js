import { useCallback, useState, useContext, useRef } from 'react'
import { allUsersService, deleteUserService, updateUserService } from '../Services/adminService'

import { UserContext } from '../Contexts/UserContext'
import { passwordValidation, roleValidation } from '../Validations'
import { AdminUsersContext } from '../Contexts/AdminUsersContext'

export const useUserManagement = () => {
    const { admins, setAdmins, clients, setClients, instructors, setInstructors } = useContext(AdminUsersContext)
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState(false)
    const { jwt } = useContext(UserContext)
    const previousData = useRef({ admins, clients, instructors })
    const firstRender = useRef(true)

    //TODO: pedir x separado administradores,... y no todos juntos
    //TODO: GESTIONAR ERRORES
    const getUsers = useCallback(async () => {
        // if (jwt === null) {
        //     navigate('/login')

        // }
        if (firstRender.current === true) { console.log('firstRender') }
        if (JSON.stringify(previousData.current.admins) === JSON.stringify(admins) && previousData.current.clients === clients && previousData.current.instructors === instructors && !firstRender.current) {
            
            return
        }
        setLoading(true)
        const users = await allUsersService({ jwt })
        setAdmins(users["admins"])
        setClients(users["clients"])
        setInstructors(users["instructors"])
        setLoading(false)
        previousData.current = { admins, clients, instructors }

        if (firstRender.current === true) firstRender.current = false

    }, [admins,clients,instructors])


    const editUser = async ({ email, password, role }) => {

        const passwordValidationResult = passwordValidation({ password })
        const roleValidationResult = roleValidation({ role: role.toLowerCase() })

        let error = passwordValidationResult && roleValidationResult

        if (!error) return false

        try {

            await updateUserService({ email, password, role, jwt })
            getUsers()
            return true

        } catch (error) {
            return false
        }
    }

    const deleteUser = async ({ email, role }) => {
        try {
            console.log(jwt)
            await deleteUserService({ email, jwt })
            switch (role.toLowerCase()) {
                case 'a':
                    setAdmins(admins.filter((admin) => admin.email !== email))
                    break
                case 'c':
                    setClients(clients.filter((client) => client.email !== email))
                    break
                case 'i':
                    setInstructors(instructors.filter((instructor) => instructor.email !== email))
                    break
                default:
                    break
            }


        } catch (e) {
            console.log(e.message)
        }
    }

    return {
        loading,
        editUser,
        deleteUser,
        view,
        setView,
        getUsers
    }
}
