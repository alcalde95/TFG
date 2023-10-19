import { Link } from "react-router-dom"

const LinkButton = ( {link, name} ) => {
    return (
        
        <Link to={link} ><button className='bg-neutral-400 p-2 w-40 m-1 rounded-lg text-center hover:bg-neutral-300 transition duration-200 ease-in-out '>{name}</button></Link>
     )
}

export default LinkButton


