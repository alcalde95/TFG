import LinkButton from './Buttons/LinkButton'
import PersonalInfoHeader from './Headers/PersonalInfoHeader'
const LandingPage = () => {

    return (
        <body className='flex flex-col justify-center items-center h-[100vh]'>
            
            <PersonalInfoHeader />

            <div className="flex flex-col justify-center items-center  h-[100vh] ">
                <p>Aquí irá el logo,aún no lo tengo</p>

                <div className='bg-neutral-600 p-8 rounded-lg text-white w-auto text-center'>
                    <h1>Eslogan o lo q sea, esto es una plantilla</h1>
                    <br></br>
                    <LinkButton className='m' link='/Login' name="Login"/>
                    <LinkButton link='/Register' name="Register"/>
                </div>
            </div>
        </body>
    )
}
export default LandingPage