import { useNavigate } from 'react-router-dom'
import { Header } from './Header'

export const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='max-w-6xl min-w-80 w-full min-h-screen flex flex-col'>
            <Header />
            <nav className="flex flex-col justify-center items-center text-center m-2 p-1 px-2 py-2 pe-0 h-full bg-slate-300 border-4 border-teal-500 rounded-md gap-4">
                <h1 className='font-bold text-9xl'>
                    404
                </h1>
                <h2 className='font-bold'>
                    LA PÁGINA QUE BUSCA NO EXISTE
                </h2>
                <button onClick={() => navigate('/')}
                    className='bg-teal-500 w-20 h-10 border-2 border-teal-500 text-white p-1 rounded-md mr-2 hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500'>
                    INICIO
                </button>
            </nav>
        </div>
    )
}
