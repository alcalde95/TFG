import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import LinkButton from '../Buttons/LinkButton'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import DefaultInput from '../InputElements/DefaultInput'

import PersonalInfoHeader from '../Headers/PersonalInfoHeader'

const Login = () => {
    const navigate = useNavigate()

    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [enterUse, setenterUse] = useState(0)
    console.log({correo})

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
            
            <div className="flex flex-col justify-center items-center h-[96vh]">

                <div className=' bg-neutral-600 p-8 rounded-lg flex flex-col justify-between gap-4 items-center w-[33vw]'>
                    <p className='bg-neutral-500 p-2 rounded-lg w-full text-center text-neutral-50'>
                    </p>

                    <hr className='border-b border-neutral-300 w-full' />

                    <p id='errorEmailoContrasena' style={{ display: 'none' }} className='text-red-700 bg-zinc-300	border-2 rounded-md'> Email o contraseña incorrectos</p>

                    <DefaultInput value={correo} action={setCorreo}/>

                    <p>correo: {correo}</p>                   

                    <input type="password"
                        placeholder='Contraseña'
                        className='bg-neutral-500 p-2 rounded-lg w-full text-center placeholder:text-neutral-50 text-neutral-50 outline-none'
                        value={contrasena}
                        name='correo'
                        autoComplete='off'
                        onChange={e => setContrasena(e.target.value)}
                    />


                    <hr className='border-b border-neutral-300 w-full' />

                    <button
                        onClick={() => iniciarSesion()}
                        className='bg-neutral-400 p-2 rounded-lg w-full text-center hover:bg-neutral-300 transition duration-200 ease-in-out'
                    >
                        Inicio sesión
                    </button>

                    <div >
                        <LinkButton link='/Register' name="Register" />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login