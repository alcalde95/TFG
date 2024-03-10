import { createBrowserRouter } from "react-router-dom"
import { LandingPage } from "./Components/LandingPage"
import { RouterProvider } from "react-router-dom"
import { Login } from "./Components/Login"
import { Register } from "./Components/Register"
import { UserContextProvider } from "./Contexts/UserContext"
import { UsersManagement } from "./Components/AdminManagement/UsersManagement"
import { AdminPage } from "./Components/AdminManagement/AdminPage"
import { ClassesManagement } from "./Components/AdminManagement/ClassesManagement"
import { AdminUsersContextProvider } from "./Contexts/AdminUsersContext"
import { ClassesContextProvider } from "./Contexts/ClassesContext"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/admin",
      element: <AdminPage />
    },
    {
      path: "/usersManagement",
      element: <UsersManagement />
    },
    {
      path: "/classesManagement",
      element: <ClassesManagement />
    },
    {
      path: "*",
      element: <h1 className="w-screen h-screen bg-slate-500 font-bold text-4xl flex items-center justify-center">🚧IN DEVELOPEMENT🚧</h1> //TODO
    }
  ])

  return (
    <div className="box-content min-w-full  min-h-screen bg-slate-700 flex flex-col content-center items-center p-0 m-0 text-black font-mono">
      <UserContextProvider>
        <ClassesContextProvider>
          <AdminUsersContextProvider>
            <RouterProvider router={router} />
          </AdminUsersContextProvider>
        </ClassesContextProvider>
      </UserContextProvider>

    </div>
  )
}

export default App
