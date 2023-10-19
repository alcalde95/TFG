import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Registro = () => {

    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [contrasenaRepetida, setContrasenaRepetida] = useState('')
    const navigate = useNavigate()

    const comprobacionesEmail = () => {

        !comprobarEmail(correo) ? mostrar('errorEmail', 'El email no cumple los parámetros mínimos') : ocultar('errorEmail')

        return comprobarEmail(correo)

    }

    const comprobacionesContrasena = () => {

        contrasena.length < 8 ? mostrar('errorContrasena', 'La contraseña es demasiado corta. Mínimo 8 caracteres') :
            !comprobarPassword(contrasena) ? mostrar('errorContrasena', 'La contraseña no cumple los parámetros mínimos') :
                ocultar('errorContrasena')
        return contrasena.length > 8 && comprobarPassword(contrasena)
    }

    const contrasenaIguales = () => {
        contrasena != contrasenaRepetida ? mostrar('errorContrasenasNoIguales', 'Las contraseñas no son iguales') : ocultar('errorContrasenasNoIguales')
        return contrasena == contrasenaRepetida
    }

    const comprobacionFinal = () => {
        comprobacionesEmail() && comprobacionesContrasena() && contrasenaIguales() ? (alert('Registro completado'), navigate("/")) : mostrar('errorRegistro', 'Alguno de los parámetros introducidos no cumple los requisitos')
    }

    
   
    return (

        <div className="flex flex-col justify-center items-center h-[100vh] bg-black">
            <div className='bg-neutral-600 p-8 rounded-lg flex flex-col justify-between gap-4 items-center w-[33vw]'>


                <hr className='border-b border-neutral-300 w-full' />

                <input
                    type="text"
                    className='bg-neutral-500 p-2 rounded-lg w-full text-center placeholder:text-neutral-50 text-neutral-50 outline-none'
                    value={correo}
                    placeholder='Correo electrónico'
                    name='correo'
                    autoComplete='off'
                    onChange={e => setCorreo(e.target.value)}
                    onBlur={() => comprobacionesEmail()}
                />
                <p id='errorEmail' style={{ display: 'none' }} className='text-red-700 bg-zinc-300	border-2 rounded-md'></p>

                <input type="password"
                    placeholder='Contraseña'
                    className='bg-neutral-500 p-2 rounded-lg w-full text-center placeholder:text-neutral-50 text-neutral-50 outline-none'
                    value={contrasena}
                    name='contrasena'
                    autoComplete='off'
                    onChange={e => setContrasena(e.target.value)}
                    onBlur={() => comprobacionesContrasena('errorContrasena')}
                />
                <p id='errorContrasena' style={{ display: 'none' }} className='text-red-700 bg-zinc-300	border-2 rounded-md'></p>

                <input type="password"
                    placeholder='Repita la contraseña'
                    className='bg-neutral-500 p-2 rounded-lg w-full text-center placeholder:text-neutral-50 text-neutral-50 outline-none'
                    value={contrasenaRepetida}
                    name='contrasenaRepetida'
                    autoComplete='off'
                    onChange={e => setContrasenaRepetida(e.target.value)}
                    onBlur={() => contrasenaIguales()}
                />

                <p id='errorContrasenasNoIguales' style={{ display: 'none' }} className='text-red-700 bg-zinc-300	border-2 rounded-md'></p>

                <hr className='border-b border-neutral-300 w-full' />



                <button
                    className='bg-neutral-400 p-2 rounded-lg w-full text-center hover:bg-neutral-300 transition duration-200 ease-in-out'
                    onClick={() => comprobacionFinal()}
                >
                    Registro
                </button>

                <p id='errorRegistro' style={{ display: 'none' }} className='text-red-700 bg-zinc-300	border-2 rounded-md'></p>
            </div>
        </div>
    )

}
export default Registro