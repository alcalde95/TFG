
export const Session = ({ session }) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    return (
        <div className="bg-slate-400 text-center w-72 border-white border-2 rounded-lg h-20 
                        flex flex-col items-center justify-center 
                        hover:bg-slate-700 hover:text-white 
                        transition duration-200 ease-in-out hover:cursor-pointer"
            onClick={() => alert("🚧IN DEVELOPEMENT🚧") }
        >
            {/*TODO REVISAR ESTO*/}
            <p >{session.data_time}</p>
            <p >{((new Date(session.data_time)).toLocaleString('es-ES',options))}</p>
        </div>
    )
}
