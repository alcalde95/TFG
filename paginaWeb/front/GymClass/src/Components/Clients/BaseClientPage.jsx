import { DefaultButton } from '../CustomTailwindElements';
import { Header } from '../Header'
import { useLocation, useNavigate } from "react-router-dom";

export const BaseClientPage = () => {
  
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="min-w-80 w-full min-h-screen flex flex-col gap-2 relative text-white">
      <Header />
      <main className="h-full flex flex-col place-content-start items-center m-2 p-2">
        <nav className='flex flex-row gap-12'>
          <DefaultButton handleClick={() => navigate(`${location.pathname}/clientClassSearch`)} text='Búsqueda' />
          <DefaultButton handleClick={() => navigate(`${location.pathname}/myClasses`)} text='Clases inscrito' />
        </nav>
      </main>
    </div>
  )
}
