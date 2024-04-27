import { Header } from "../Header"
import { Users } from "./Users"
import { useUserManagement } from "../../hooks/useUserManagement"
import useUser from "../../hooks/useUser"
import { useContext, useEffect } from "react"
import { AdminUsersContext } from "../../Contexts/AdminUsersContext"
import { Link } from "react-router-dom"
import { DefaultButton, InputMovinTitle } from "../CustomTailwindElements"

export const UsersManagement = () => {

  const { loading, view, setView, getUsers } = useUserManagement()
  const { admins, instructors } = useContext(AdminUsersContext)
  const { register, emailError, passwordError, resetErrors } = useUser()

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleAddSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    const role = e.target[2].value
    const res = await register({ email, password, role })
    getUsers()
    if (res) {
      setView(false)
    }
  }

  return (
    <div className="w-full min-w-80 min-h-screen flex flex-col items-center gap-2">
      <Header />
      <main className="h-full flex flex-col border border-gray-500 rounded-md p-2 w-11/12 max-w-7xl text-white">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl m-2">Gestión de Usuarios</h1>
          <DefaultButton  handleClick={() => { resetErrors(); setView(!view) }} text="Añadir usuario" />
          {

            view
              ? <form name="addUserForm"
                onSubmit={handleAddSubmit}
                className="flex flex-col items-center md:grid md:grid-cols-3 w-auto md:w-full border border-gray-500 bg-[#1C1917] m-2 rounded-md gap-4 p-2 "
              >
               <InputMovinTitle name="Email" type="text" />
                <InputMovinTitle name="Contraseña" type="password" />
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
                  passwordError || emailError ? <p className="md:col-start-2 bg-red-600 text-white p-2 rounded-md m-2">Email o contraseña incorrectos</p> : null
                }
                <button className="md:col-start-2 bg-white w-full min-w-52 h-10 text-black p-1 rounded-md  hover:bg-gray-300 ease-in-out duration-200 border border-white">Añadir</button>
              </form>
              : null
          }
        </div>
        <section className="w-full flex flex-col justify-start">
          {
            loading
              ? <p className="text-2xl ">Cargando...</p>
              : <>
                <h2 className="text-2xl ">Administradores</h2>
                <Users users={admins} />

                <h2 className="text-2xl ">Clientes</h2>

                <Link to="/admin/usersManagement/clients" className="bg-transparent m-1 max-w-96 h-10 border border-gray-500 text-white p-1 rounded-md mr-2  hover:border-green-500  text-center content-center" > Lista de clientes</Link>
                <h2 className="text-2xl ">Instructores</h2>
                <Users users={instructors} />
              </>
          }

        </section>

      </main>
    </div>
  )
}
