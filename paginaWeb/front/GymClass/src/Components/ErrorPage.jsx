import { useNavigate } from 'react-router-dom'
import { Header } from './Header'
import { DefaultButton } from './CustomTailwindElements'

export const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='min-w-80 w-full min-h-screen flex flex-col gap-2 relative text-white'>
            <Header />
            <nav className="h-full flex flex-col place-content-start items-center m-2 p-2">
                <h1 className='font-bold text-9xl'>
                    404
                </h1>
                <h2 className='font-bold'>
                    LA PÁGINA QUE BUSCA NO EXISTE
                </h2>
                <DefaultButton handleClick={() => navigate('/')} text={'INICIO'} />
            </nav>
        </div>
    )
}
