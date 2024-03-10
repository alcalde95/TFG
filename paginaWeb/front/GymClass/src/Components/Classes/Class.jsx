
export const Class = ({ c, editable }) => {

    return (
        <div className="flex flex-col  items-center border-2 border-teal-500 bg-gray-400 m-2 rounded-md   p-2 shadow-[2px_2px_5px_0px] shadow-gray-800">
            <h1 className="font-bold text-3xl m-2 underline">{c.name}</h1>
            <img src="https://cataas.com/cat/says/hello" className="aspect-square w-11/12 sm:w-96 rounded-lg rounded-b-none border-2 border-b-0"></img>
            <textarea defaultValue={c.description} className="w-11/12 sm:w-96 border-2  rounded-lg p-2 bg-slate-500 rounded-t-none border-t-0 text-slate-200"/>
            <section className="flex flex-col w-11/12 sm:w-96 justify-around m-4 p-4 bg-slate-500 border-2 rounded-lg text-slate-200">
                <p>{c.instructorEmail}</p>
                <div className="flex flex-row w-full justify-around">
                    <p>Duración:{c.duration}&apos;</p>
                    <p>Aforo máximo:{c.max_Capacity}</p>
                </div>
            </section>
            {
                editable
                    ? <button className="bg-teal-500  w-full h-10 border-2 border-teal-500 text-white rounded-md hover:bg-teal-400 hover:border-white  shadow-[2px_2px_5px_0px] shadow-gray-500">Editar</button>
                    : null
            }
        </div>
    )
}
