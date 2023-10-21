const OnBlurOnChangeInput = ({ type,value,placeholder,name, action,onBlur }) => {
    return (


        <input
            type={type}
            className='bg-neutral-500 p-2 rounded-lg w-full text- text-center placeholder:text-neutral-50 text-neutral-50 outline-none whitespace-pre-wrap max-w-screen-sm overflow-hidden'
            value={value}
            placeholder={placeholder}
            name={name}
            autoComplete='off'
            onChange={(e) => action(e.target.value)}
            onBlur={() =>onBlur()}
        />
    )
}

export default OnBlurOnChangeInput