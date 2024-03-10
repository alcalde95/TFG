import { useCallback, useContext, useState } from "react"
import { ClassesContext } from "../Contexts/ClassesContext"
import { classesService } from "../Services/classService"

export const useClasses = () => {

    const { setClasses } = useContext(ClassesContext)
    const [loading, setLoading] = useState(true)

    const getClasses = useCallback(async () => {
        try {
            setLoading(true)
            const classes = await classesService()
            setClasses(classes)
            setLoading(false)
            console.log('classes:', classes)
        } catch (error) {
            console.log(error)
        }
    },[])

    return {
        loading,
        getClasses,
    }
}
