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
import { InstructorPage } from "./Components/InstructorPage"
import { ClientsManagement } from "./Components/AdminManagement/ClientsManagement"
import { SessionsContextProvider } from "./Contexts/SessionsContext"
import { SessionsManagement } from "./Components/SessionsManagement"
import { ManagedSessionsManagement } from "./Components/ManagedSessionsManagement"
import { SessionClientsManagement } from "./Components/SessionClientsManagement"
import { SessionClientsContextProvider } from "./Contexts/SessionClientsContext"
import { SessionContextProvider } from "./Contexts/SessionContext"
import { BaseClientPage } from "./Components/Clients/BaseClientPage"
import { SearchClassClientPage } from "./Components/Clients/SearchClassClientPage"
import { ClientClassSessions } from "./Components/Clients/ClientClassSessions"
import { ClientClasses } from "./Components/Clients/ClientClasses"

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
    }, {
      path: "/instructor/managed/:uuidClass",
      element: <ManagedSessionsManagement />
    }, {
      path: "/instructor/managed/:uuidClass/:date",
      element: <SessionClientsManagement />
    }, {
      path: "/client",
      element: <BaseClientPage />
    }, {
      path: "/client/clientClassSearch",
      element: <SearchClassClientPage />
    },
    {
      path: "*",
      element: <ErrorPage />
    },{
      path: "/client/:uuidClass",
      element: <ClientClassSessions />
    },{
      path: "/client/myClasses",
      element: <ClientClasses />
    },
  ])

  return (
    <div className="box-content min-w-full  min-h-screen bg-[#09090B] flex flex-col content-center items-center p-0 m-0 text-black font-mono">
      <SessionContextProvider>
        <SessionClientsContextProvider>
          <UserContextProvider>
            <ClassesContextProvider>
              <SessionsContextProvider>
                <AdminUsersContextProvider>
                  <RouterProvider router={router} />
                </AdminUsersContextProvider>
              </SessionsContextProvider>
            </ClassesContextProvider>
          </UserContextProvider>
        </SessionClientsContextProvider>
      </SessionContextProvider>

    </div>
  )
}

export default App
