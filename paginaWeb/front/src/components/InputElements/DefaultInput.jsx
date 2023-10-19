const DefaultInput = ({ value, action }) => {
    return (


        <input
            type="text"
            className='bg-neutral-500 p-2 rounded-lg w-full text-center placeholder:text-neutral-50 text-neutral-50 outline-none'
            value={value}
            placeholder='Correo electrónico'
            name='correo'
            autoComplete='off'
            onChange={(e) => action(e.target.value)}
        />
    )
}

export default DefaultInput