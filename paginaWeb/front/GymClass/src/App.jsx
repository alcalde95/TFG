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
import { ErrorPage } from "./Components/ErrorPage"
import { SessionsManagement } from "./Components/AdminManagement/SessionsManagement"
import { InstructorPage } from "./Components/InstructorPage"
import { ClientsManagement } from "./Components/AdminManagement/ClientsManagement"
import { SessionsContextProvider } from "./Contexts/SessionsContext"

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
      path: "/admin/usersManagement",
      element: <UsersManagement />
    },
    {
      path: "/admin/usersManagement/clients",
      element: <ClientsManagement />
    },
    {
      path: "/admin/classesManagement",
      element: <ClassesManagement />
    },
    {
      path: "/admin/classesManagement/:uuidClass",
      element: <SessionsManagement />
    },
    {
      path: "/instructor",
      element: <InstructorPage />
    }, {
      path: "/instructor/:uuidClass",
      element: <SessionsManagement />
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ])

  return (
    <div className="box-content min-w-full  min-h-screen bg-slate-700 flex flex-col content-center items-center p-0 m-0 text-black font-mono">
      <UserContextProvider>
        <ClassesContextProvider>
          <SessionsContextProvider>
            <AdminUsersContextProvider>
              <RouterProvider router={router} />
            </AdminUsersContextProvider>
          </SessionsContextProvider>
        </ClassesContextProvider>
      </UserContextProvider>

    </div>
  )
}

export default App
