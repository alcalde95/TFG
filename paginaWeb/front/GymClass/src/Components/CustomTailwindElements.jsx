
export const InputMovinTitle = ({ handleChange, name, type,min }) => {
    return (
        <div className="relative w-full min-w-[200px] h-10">
            <input
                className="peer h-full w-full rounded-[7px] border border-green-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-500 placeholder-shown:border-t-green-500 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-500"
                placeholder=" "
                type={type}
                name={name}
                id={name}
                onChange={handleChange ? handleChange : undefined}
                autoComplete={name}
                min={min}
            />
            <label
                htmlFor={name}
                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-5000"
            >{name}
            </label>
        </div>
    )
}

export const InputMovinTitleWValue = ({ handleChange, name, type, value,min }) => {
    return (
        <div className="relative w-full min-w-[200px] h-10">
            <input
                className="peer h-full w-full rounded-[7px] border border-green-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-500 placeholder-shown:border-t-green-500 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-500"
                placeholder=" "
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={handleChange ? handleChange : undefined}
                autoComplete={name}
                min={min}
            />
            <label
                htmlFor={name}
                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500"
            >{name}
            </label>
        </div>
    )
}

export const DefaultButton = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}
            className="bg-[#09090B] w-auto min-w-52 h-10 text-white p-1 rounded-md  hover:border-green-500 hover:text-green-500 ease-in-out duration-200 border border-gray-500"
        >
            {text}
        </button>
    )
}
export const DefaultWhiteButton = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}
            className="bg-white w-auto min-w-52 h-10 text-black p-1 rounded-md  hover:bg-gray-300 ease-in-out duration-200 border border-white"
        >
            {text}
        </button>
    )
}
export const FullWDefaultButton = ({ handleClick, text}) => {
    return (
        <button onClick={handleClick}
            className="bg-[#09090B] w-full min-w-52 h-10 text-white p-1 rounded-md  hover:border-green-500 hover:text-green-500 ease-in-out duration-200 border border-gray-500"
        >
            {text}
        </button>
    )
}
