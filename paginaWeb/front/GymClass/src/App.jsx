import { createBrowserRouter } from "react-router-dom"
import { LandingPage } from "./Components/LandingPage"
import { RouterProvider } from "react-router-dom"
import { Login } from "./Components/Login"
import { Register } from "./Components/Register"

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
    }
  ])

  return (
    <div className="box-content min-w-full  min-h-screen bg-slate-700 flex flex-col content-center items-center p-0 m-0 text-black font-mono">
     <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
