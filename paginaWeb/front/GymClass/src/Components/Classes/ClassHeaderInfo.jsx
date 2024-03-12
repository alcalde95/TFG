
export const ClassHeaderInfo = ({ headerClass}) => {
    return (
        <div className="grid grid-cols-5 md:grid-cols-8 justify-between w-full flex-wrap gap-2 border-2 rounded-md bg-slate-400 items-end text-center">
            <img src="https://cataas.com/cat/says/hello" className="aspect-square w-full rounded-md rounded-r-none border-black md:row-span-2"></img>
            <h1 className="col-span-2 p-2 font-bold text-3xl underline">{headerClass.name}</h1>
            <p className="col-span-2 p-2">Duración:{headerClass.duration}</p>
            <p className="col-span-2 p-2">Capacidad máxima:{headerClass.max_Capacity}</p>
            <textarea defaultValue={headerClass.description} className="col-span-2 p-2 bg-transparent" />
            <p className="col-span-2 p-2">{headerClass.instructorEmail}</p>
        </div>
    )
}
