
export const ClassHeaderInfo = ({ headerClass }) => {
    return (
        <div className="sm:grid md:grid-cols-5 lg:grid-cols-8 md:place-items-stretch md:justify-between md:items-end max-w-7xl w-11/12 flex flex-col flex-wrap gap-2 border border-gray-500 p-1 rounded-md bg-transparent content-center justify-center items-center place-content-center text-center text-white">
            <img src={headerClass.photo} className="aspect-square max-w-52 sm:max-w-[100px] rounded-md lg:rounded-r-none border-black md:row-span-2 m-2 lg:m-0"></img>
            <h1 className="col-span-2 p-2 font-bold text-xl underline">{headerClass.name}</h1>
            <p className="col-span-2 p-2">Duración:{headerClass.duration}</p>
            <p className="col-span-2 p-2">Capacidad máxima:{headerClass.max_Capacity}</p>
            <p className="col-span-2 p-2 text-xs md:text-base overflow-hidden ">{headerClass.instructorEmail}</p>
            <textarea defaultValue={headerClass.description} className="box-content col-span-5 m-auto mb-2 lg:m-0 max-h-24 w-11/12 text-center  bg-[#1C1917] text-gray-200 appearance-non rounded-md"/>
        </div>
    )
}
