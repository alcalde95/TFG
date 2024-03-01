import { useCallback, useState, useContext, useEffect } from 'react'
import { allUsersService, deleteUserService } from '../Services/adminService'

import { UserContext } from '../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'

export const useUserManagement = () => {
    const [admins, setAdmins] = useState([])
    const [clients, setClients] = useState([])
    const [instructors, setInstructors] = useState([])
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState(false)
    const { jwt } = useContext(UserContext)

    const navigate = useNavigate()

    const getUsers = useCallback(async () => {
        jwt == null
            ? navigate('/login')
            : null
        const users = await allUsersService({ jwt })
        setAdmins(users["admins"])
        setClients(users["clients"])
        setInstructors(users["instructors"])
        setLoading(false)

    }, [jwt, navigate])

    //preguntar a stephan si estaría bien xd
    useEffect(() => {
        getUsers()
    }, [admins, clients, instructors, getUsers])

    const deleteUser = async ({ email, role }) => {
        try {
            console.log(jwt)
            await deleteUserService({ email, jwt })
            switch (role) {
                case 'Administrador':
                    setAdmins(admins.filter((admin) => admin.email !== email))
                    break
                case 'Cliente':
                    setClients(clients.filter((client) => client.email !== email))
                    break
                case 'Instructor':
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
        admins,
        clients,
        instructors,
        loading,
        deleteUser,
        view,
        setView
    }
}
