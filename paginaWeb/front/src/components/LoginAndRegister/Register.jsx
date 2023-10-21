import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnBlurOnChangeInput from '../InputElements/OnBlurOnChangeInput'
import SeparatorLine from '../VisualComponents/SeparatorLine'
import PersonalInfoHeader from '../Headers/PersonalInfoHeader'
import DefaultErrorOutput from '../ErrorCoponents/DefaultErrorOutput'
import { verifyEmail, verifyPassword } from '../Validations/InputValidationes/registerValidationes'

import { showHTMLelement } from '../Validations/InputValidationes/registerValidationes'
import { hideHTMLelement } from '../Validations/InputValidationes/registerValidationes'

const Registro = () => {

    const [correo, setCorreo] = useState('')
    const [password, setpassword] = useState('')
    const [duplicatedPassword, setDuplicatedPassword] = useState('')
    const navigate = useNavigate()

    const emailVerification = () => {

        !verifyEmail(correo) ? showHTMLelement('emailerror', 'El email no cumple los parámetros mínimos') : hideHTMLelement('emailerror')

        return verifyEmail(correo)

    }

    const passwordVerification = () => {

        password.length < 8 ? showHTMLelement('passwordError', 'La contraseña es demasiado corta. Mínimo 8 caracteres') :
            !verifyPassword(password) ? showHTMLelement('passwordError', 'La contraseña no cumple los parámetros mínimos') :
                hideHTMLelement('passwordError')
        return password.length > 8 && verifyPassword(password)
    }

    const duplicatedPasswordVerification = () => {
        password != duplicatedPassword ? showHTMLelement('notTheSamePasswordsError', 'Las contraseñas no son iguales') : hideHTMLelement('notTheSamePasswordsError')
        return password == duplicatedPassword
    }

    const finalVerification = () => {
        emailVerification() && passwordVerification() && duplicatedPasswordVerification() ? (alert('Registro completado'), navigate("/Login")) : showHTMLelement('registerError', 'Alguno de los parámetros introducidos no cumple los requisitos')
    }



    return (

        <div>
            <PersonalInfoHeader />


            <div className="flex flex-col justify-center items-center h-[80vh] box-border sm:my-10">
                <div className='bg-neutral-600 p-8 rounded-lg flex flex-col justify-between gap-4 items-center w-10/12 min-[400px]:w-auto min-[900px]:w-[33vw] '>


                    <SeparatorLine />

                    <OnBlurOnChangeInput type="text" value={correo} placeholder='Correo electrónico' name='email' action={setCorreo} onBlur={emailVerification} />

                    <DefaultErrorOutput id={"emailerror"} errorContent={"Email incorrecto"} />

                    <OnBlurOnChangeInput type="password" value={password} placeholder='Contraseña' name='password' action={setpassword} onBlur={passwordVerification} />

                    <DefaultErrorOutput id={"passwordError"} errorContent={"Contraseña incorrecta"} />

                    <OnBlurOnChangeInput type="password" value={duplicatedPassword} placeholder='Repita la contraseña' name='duplicatedPassword' action={setDuplicatedPassword} onBlur={duplicatedPasswordVerification} />

                    <DefaultErrorOutput id={"notTheSamePasswordsError"} errorContent={"Las contraseñas no son iguales"} />

                    <SeparatorLine />



                    <button
                        className='bg-neutral-400 p-2 rounded-lg w-full text-center hover:bg-neutral-300 transition duration-200 ease-in-out'
                        onClick={() => finalVerification()}
                    >
                        Registro
                    </button>

                    <DefaultErrorOutput id={"registerError"} errorContent={""} />

                </div>
            </div>
        </div>
    )

}
export default Registro