import { useState, useContext, useEffect } from "react"
import { Header } from "./Header"
import { useNavigate } from "react-router-dom"

import { UserContext } from "../Contexts/UserContext"

import { allUsersService, deleteUserService } from "../Services/adminService"

export const UserManagement = () => {
  const [admins, setAdmins] = useState([])
  const [clients, setClients] = useState([])
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)
  const { jwt } = useContext(UserContext)

  const navigate = useNavigate()


  const deleteUser = async ({ email }) => {
    try {
       await deleteUserService({ email, jwt })
       //TODO: MEJORAR ESTO
      setAdmins(admins.filter((admin) => admin.email !== email))
      setClients(clients.filter((client) => client.email !== email))
      setInstructors(instructors.filter((instructor) => instructor.email !== email))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {

    const getUsers = async () => {
      const users = await allUsersService({ jwt })
      setAdmins(users["admins"])
      setClients(users["clients"])
      setInstructors(users["instructors"])
      setLoading(false)
    }
    if (jwt !== null) {
      getUsers()
    } else {
      navigate('/login')
    }

  }, [jwt, navigate,admins,clients,instructors]) //TODO: quitar admins,clients,intructors

  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
      <Header />
      <main className="h-full bg-slate-300 flex  flex-col place-content-start items-center border-4 border-teal-500 rounded-md m-2 p-2 ">
        <h1 className="text-4xl">Gestión de Usuarios</h1>
        <section className="flex flex-col items-start w-full">
          {
            loading
              ? <p className="text-2xl ">Cargando...</p>
              : <>
                <h2 className="text-2xl ">Administradores</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 w-auto">
                  {
                    admins.map((admin) => {
                      return <li key={admin.email} className="w-60 h-30 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">
                        <p>{admin.email}</p>
                        <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Delete</button>
                        <br />
                        <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Editar</button>
                      </li>
                    })

                  }
                </ul>
                <h2 className="text-2xl ">Clientes</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 w-auto">
                  {
                    clients.map((client) => {
                      return <li key={client.email} className="w-60 h-30 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">
                        <p>{client.email}</p>
                        <button onClick={() => deleteUser({ email: client.email })} className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Delete</button>
                        <br />
                        <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Editar</button>
                      </li>
                    })
                  }
                </ul>
                <h2 className="text-2xl ">Instructores</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 w-auto">
                  {
                    instructors.map((instructor) => {
                      return <li key={instructor.email} className="min-w-60 h-30 border-green-700 border-2 rounded-md p-2 text-center bg-gray-400 text-white shadow-[2px_2px_5px_0px] shadow-gray-500">
                        <p>{instructor.email}</p>
                        <button onClick={() => deleteUser({ email: instructor.email })} className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Delete</button>
                        <br />
                        <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Editar</button>
                      </li>
                    })
                  }
                </ul>
              </>
          }

        </section>

      </main>
    </div>
  )
}
