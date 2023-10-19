import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/LoginAndRegister/Login'
import LandingPage from './Components/LandingPage'
import Register from './components/LoginAndRegister/Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Register",
    element: <Register />
  }

])


function App() {
  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
