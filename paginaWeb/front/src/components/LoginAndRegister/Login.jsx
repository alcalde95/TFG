import { useState } from 'react'
import LinkButton from '../Buttons/LinkButton'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import DefaultInput from '../InputElements/DefaultInput'
import DefaultErrorOutput from '../ErrorCoponents/DefaultErrorOutput'
import PersonalInfoHeader from '../Headers/PersonalInfoHeader'
import SeparatorLine from '../VisualComponents/SeparatorLine'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [enterUse, setenterUse] = useState(0)

    useEffect(() => {
        enterUse == 1 ? navigate("/Menu") : null
        setenterUse(0)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enterUse])

    const iniciarSesion = () => {
        setenterUse(1)
    }

    return (
        <div>
            
            <PersonalInfoHeader />

            <div className="flex flex-col justify-center items-center h-[80vh] box-border sm:my-10">

                <div className=' bg-neutral-600 p-8 rounded-lg flex flex-col justify-between gap-4 items-center w-10/12 min-[400px]:w-auto  '>

                   <SeparatorLine />

                    <p id='errorEmailoContrasena' style={{ display: 'none' }} className='text-red-700 bg-zinc-300	border-2 rounded-md'> Email o contraseña incorrectos</p>

                    <DefaultInput type="text" value={email} placeholder={"Correo Electrónico"} name="correo" action={setEmail} />

                    <DefaultErrorOutput id={"badLoginError"} errorContent={"Email o contraseña incorrectos"} />

                    <DefaultInput type="password" value={password} placeholder={"Contraseña"} name={"password"} action={setPassword} />



                   <SeparatorLine />

                    <div className='flex flex-row justify-center items-center flex-wrap'>

                        <button
                            onClick={() => iniciarSesion()}
                            className='bg-neutral-400 p-2 rounded-lg w-40 text-center hover:bg-neutral-300 transition duration-200 ease-in-out'
                        >
                            Inicio sesión
                        </button>
                        <LinkButton link='/Register' name="Register" />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login