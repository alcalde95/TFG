import { useCallback, useState, useContext, useRef } from 'react'
import { allClientsService, allUsersService, deleteUserService, updateClientService, updateUserService } from '../Services/adminService'

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

    
    const getUsers = useCallback(async () => {

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [admins, clients, instructors])
    
    const getClients = useCallback(async () => {

        setLoading(true)
        const clients = await allClientsService({ jwt })
        setClients(clients)
        setLoading(false)
        previousData.current = { admins, clients, instructors }

        if (firstRender.current === true) firstRender.current = false

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clients])


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
            const res = await deleteUserService({ email, jwt })
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

            return res

        } catch (e) {
            console.log(e.message)
            return false
        }
    }

    const validateClient = async ({ email,validated }) => {
        try {
            await updateClientService({ email,validated,jwt })
            getUsers()
        } catch (error) {
            console.log(error.message)
        }
    }


    return {
        editUser,
        deleteUser,
        getUsers,
        getClients,
        validateClient,
        loading,
        view,
        setView,
    }
}
