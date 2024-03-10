import { Header } from "../Header"
import { Users } from "./Users"
import { useUserManagement } from "../../hooks/useUserManagement"
import useUser from "../../hooks/useUser"
import { useContext, useEffect } from "react"
import { AdminUsersContext } from "../../Contexts/AdminUsersContext"

export const UsersManagement = () => {

  const { loading, view, setView, getUsers } = useUserManagement()
  const { admins, clients, instructors } = useContext(AdminUsersContext)

  useEffect(() => {
    //console.log(admins, clients, instructors)
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const { register, emailError, passwordError, resetErrors } = useUser()

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    const role = e.target[2].value
    const res = await register({ email, password, role })
    if (res) {
      setView(false)
    }
  }

  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
      <Header />
      <main className="h-full bg-slate-300 flex flex-col items-center  border-4 border-teal-500 rounded-md m-2 p-2 ">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl m-2">Gestión de Usuarios</h1>
          <button onClick={() => { resetErrors(); setView(!view) }}
            className="bg-teal-500 m-1 w-[200px] h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">
            Añadir usuario
          </button>
          {

            view
              ? <form name="addUserForm"
                onSubmit={handleAddSubmit}
                className="flex flex-col items-center md:grid md:grid-cols-3 w-80 md:w-full border-2 border-teal-500 bg-gray-400 m-2 rounded-md gap-4 p-2 shadow-[2px_2px_5px_0px] shadow-gray-800"
              >
                <input name="email"
                  className="border-2 border-teal-500  md:w-full h-10 p-1 rounded-md  m-0"
                  type="text"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input name="password"
                  className="border-2 border-teal-500  md:w-full h-10 p-1 rounded-md  m-0"
                  type="text"
                  placeholder="Contraseña"
                  autoComplete="new-password"
                />
                <select name="userType"
                  className="border-2 border-teal-500  md:w-full h-10 p-1 rounded-md m-0"
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
                  passwordError || emailError ? <p className="md:col-start-2 bg-red-600 text-white p-2 rounded-md m-2">Email o contraseña incorrectos</p> : null
                }
                <button className="md:col-start-2 bg-teal-500  w-full h-10 border-2 border-teal-500 text-white rounded-md hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Añadir</button>
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
                <Users users={clients} />

                <h2 className="text-2xl ">Instructores</h2>
                <Users users={instructors} />
              </>
          }

        </section>

      </main>
    </div>
  )
}
