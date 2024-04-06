import { useContext, useEffect, useState } from 'react'
import { ClassesContext } from '../../Contexts/ClassesContext'
import { Header } from '../Header'
import { Classes } from '../Classes/Classes'
import { useClasses } from '../../hooks/useClasses'

export const SearchClassClientPage = () => {

    const [loading, setLoading] = useState(true)

    const { getClasses } = useClasses()

    const { classes, setClasses } = useContext(ClassesContext)

    useEffect(() => {
        setClasses([])
        setLoading(false)
    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)
        let form = e.target
        let data = new FormData(form)
        let name = data.get("name")
        let maxCapacity = data.get("maxCapacity")
        let minDuration = data.get("minDuration")
        let maxDuration = data.get("maxDuration")
        console.log(name, maxCapacity, minDuration, maxDuration)
        await getClasses({ name, maxCapacity, minDuration, maxDuration })
        setLoading(false)
    }

    return (
        <div className="max-w-6xl min-w-80 w-full min-h-screen h-full flex flex-col">
            <Header />
            <section className=" bg-slate-300 flex flex-col items-center  border-4 border-teal-500 rounded-md m-2 p-2">
                <form onSubmit={handleSubmit}>
                    <input type='text' name='name' placeholder='introduzca el nombre de la clase a buscar' />
                    <input type='number' name='maxCapacity' placeholder='nº max cli ' />
                    <input type='number' name='minDuration' placeholder='duración mínima ' />
                    <input type='number' name='maxDuration' placeholder='duración máxima' />
                    <button>Buscar</button>
                </form>

            </section>
            <main className=" bg-slate-300 flex flex-col items-center  border-4 border-teal-500 rounded-md m-2 p-2">
                
                {
                    loading
                        ? <p className="text-2xl ">Cargando...</p>
                        : <Classes classes={classes} editable={false} managed={true} />

                }
            </main>
        </div>
    )
}
