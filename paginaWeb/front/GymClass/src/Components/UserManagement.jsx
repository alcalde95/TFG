import { Header } from "./Header"
import { Users } from "./Users"
import { useUserManagement } from "../hooks/useUserManagement"

export const UserManagement = () => {

  const { admins, clients, instructors, loading } = useUserManagement()



  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col">
      <Header />
      <main className="h-full bg-slate-300 flex flex-col  border-4 border-teal-500 rounded-md m-2 p-2 ">
        <h1 className="text-4xl">Gestión de Usuarios</h1>
        {
          //TODO Agregar formulario para agregar usuarios
        }
        <button className="bg-teal-500 m-1 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Agregar</button>
        <section className="w-full flex flex-col justify-start">
          {
            loading
              ? <p className="text-2xl ">Cargando...</p>
              : <>
                <h2 className="text-2xl ">Administradores</h2>
                <Users users={admins} role={'Administrador'} />

                <h2 className="text-2xl ">Clientes</h2>
                <Users users={clients} role={'Cliente'} />

                <h2 className="text-2xl ">Instructores</h2>
                <Users users={instructors} role={'Instructor'} />
              </>
          }

        </section>

      </main>
    </div>
  )
}
