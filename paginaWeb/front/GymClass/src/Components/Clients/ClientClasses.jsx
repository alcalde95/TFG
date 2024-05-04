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
        <div className="min-w-80 w-full min-h-screen flex flex-col gap-2 relative text-white">
            <Header />
            <main className=" h-full flex flex-col place-content-start items-center m-2 p-2">

                <Classes classes={classes} editable={false} managed={true} />


            </main>
        </div>
    )
}
