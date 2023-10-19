const DefaultErrorOutput = ({id,errorContent}) =>{
    return(
        <p id={id} style={{ display: 'none' }} className='text-red-700 bg-zinc-300	border-2 rounded-md'>{errorContent}</p>
    )
}
export default DefaultErrorOutput