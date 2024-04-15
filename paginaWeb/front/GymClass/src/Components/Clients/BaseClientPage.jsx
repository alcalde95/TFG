import { Header } from '../Header'
import { useLocation, useNavigate } from "react-router-dom";

export const BaseClientPage = () => {
  
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="max-w-6xl min-w-80 w-full min-h-screen flex flex-col relative">
      <Header />
      <main className="h-full bg-slate-300 flex flex-col items-center  border-4 border-teal-500 rounded-md m-2 p-2">
        <nav className='flex flex-row gap-12'>
          <button className='bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500'
            onClick={() => navigate(`${location.pathname}/clientClassSearch`)}          
          >
            Búsqueda
          </button>
          <button className='bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500'
            onClick={() => navigate(`${location.pathname}/myClasses`)}
          >
            Clases en las que estoy inscrito
          </button>
          <button className='bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500'
          >

          </button>
        </nav>
      </main>
    </div>
  )
}
