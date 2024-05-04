import { useCallback, useContext, useEffect, useState } from 'react'
import { ClassesContext } from '../../Contexts/ClassesContext'
import { Header } from '../Header'
import { Classes } from '../Classes/Classes'
import { useClasses } from '../../hooks/useClasses'
import debounce from 'just-debounce-it'
import { DefaultWhiteButton, InputMovinTitle } from '../CustomTailwindElements'

export const SearchClassClientPage = () => {

    const [loading, setLoading] = useState(true)

    const { getClasses } = useClasses()

    const { classes, setClasses } = useContext(ClassesContext)

    useEffect(() => {
        setClasses([])
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)
        let form = e.target
        let data = new FormData(form)
        let name = data.get("Nombre")
        let maxCapacity = data.get("Capacidad Máxima")
        let minDuration = data.get("Duración Mínima")
        let maxDuration = data.get("Duración Máxima")
        console.log(name, maxCapacity, minDuration, maxDuration)
        await getClasses({ name, maxCapacity, minDuration, maxDuration })
        setLoading(false)
    }

    const handleChange = async (e) => {

        const name = e.target.value
        debouncedGetClasses({ name })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedGetClasses = useCallback(
        debounce(({ name, maxCapacity, minDuration, maxDuration }) => {
            getClasses({ name, maxCapacity, minDuration, maxDuration })
        }, 300)
        , [getClasses])

    return (
        <div className="min-w-80 w-full min-h-screen flex flex-col gap-2 relative text-white">
            <Header />
            <main className=" h-full flex flex-col place-content-start items-center m-2 p-2">
                <form onSubmit={handleSubmit}
                    className="w-11/12 md:w-4/6 max-w-2xl gap-2 flex flex-col items-center bg-[#1C1917]   p-2 rounded-lg border-gray-500 border mt-2" >
                    <InputMovinTitle name="Nombre" type="text" handleChange={handleChange} />
                    <InputMovinTitle name="Capacidad Máxima" type="number" />
                    <InputMovinTitle name="Duración Mínima" type="number" />
                    <InputMovinTitle name="Duración Máxima" type="number" />
                    <DefaultWhiteButton text="Buscar" />
                </form>


                {
                    loading
                        ? <p className="text-2xl mt-10">Cargando...</p>
                        : <Classes classes={classes} editable={false} managed={true} />

                }
            </main>
        </div>
    )
}
