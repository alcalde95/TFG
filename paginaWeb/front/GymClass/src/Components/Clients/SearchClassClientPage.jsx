import { Header } from '../Header'

export const SearchClassClientPage = () => {

    const handleSubmit = async (e) => {

        e.preventDefault()
        let form = e.target
        let data = new FormData(form)
        let name = data.get("name")
        let maxCapacity = data.get("maxCapacity")
        let minDuration = data.get("minDuration")
        let maxDuration = data.get("maxDuration")
        console.log(name, maxCapacity, minDuration, maxDuration)


    }

    return (
        <div className="max-w-6xl min-w-80 w-full h-screen flex flex-col">
            <Header />
            <main className="h-[90% ] bg-slate-300 flex flex-col items-center  border-4 border-teal-500 rounded-md m-2 p-2">
                <form onSubmit={handleSubmit}>
                    <input type='text' name='name' placeholder='introduzca el nombre de la clase a buscar' />
                    <input type='number' name='maxCapacity' placeholder='nº max cli ' />
                    <input type='number' name='minDuration' placeholder='duración mínima ' />
                    <input type='number' name='maxDuration' placeholder='duración máxima' />
                    <button>Buscar</button>
                </form>
            </main>

        </div>
    )
}
