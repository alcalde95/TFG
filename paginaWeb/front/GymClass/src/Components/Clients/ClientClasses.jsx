import { useContext, useEffect } from 'react'
import { ClassesContext } from '../../Contexts/ClassesContext'
import { Header } from '../Header'
import { Classes } from '../Classes/Classes'
import { useClasses } from '../../hooks/useClasses'
import { UserContext } from '../../Contexts/UserContext'

export const ClientClasses = () => {



    const { getClassesClient } = useClasses()

    const { classes } = useContext(ClassesContext)
    const { jwt } = useContext(UserContext)

    useEffect(() => {

        getClassesClient({ jwt })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="max-w-6xl min-w-80 w-full min-h-screen h-full flex flex-col">
            <Header />
            <main className=" bg-slate-300 flex flex-col items-center  border-4 border-teal-500 rounded-md m-2 p-2">

                <Classes classes={classes} editable={false} managed={true} />


            </main>
        </div>
    )
}
