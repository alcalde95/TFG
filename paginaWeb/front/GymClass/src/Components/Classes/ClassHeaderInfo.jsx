
export const ClassHeaderInfo = ({ headerClass}) => {
    return (
        <div className="grid grid-cols-5 md:grid-cols-8 place-items-stretch justify-between w-full flex-wrap gap-2 border-2 rounded-md bg-slate-400 items-end text-center">
            <img src="https://cataas.com/cat/says/hello" className="aspect-square  rounded-md rounded-r-none border-black md:row-span-2"></img>
            <h1 className="col-span-2 p-2 font-bold text-3xl underline">{headerClass.name}</h1>
            <p className="col-span-2 p-2">Duración:{headerClass.duration}</p>
            <p className="col-span-2 p-2">Capacidad máxima:{headerClass.max_Capacity}</p>
            <p className="col-span-2 p-2 text-xs md:text-base overflow-hidden ">{headerClass.instructorEmail}</p>
            <textarea defaultValue={headerClass.description} className="col-span-5 m-2 max-h-24 w-auto text-center  bg-gray-800 text-gray-200 appearance-non rounded-md" />
        </div>
    )
}
