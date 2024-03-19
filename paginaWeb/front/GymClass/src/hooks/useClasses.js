import { useCallback, useContext, useState } from "react"
import { ClassesContext } from "../Contexts/ClassesContext"
import { classesInstructorService, classesService, createClassService } from "../Services/classService"
import { classDescriptionValidation, classDurationValidation, classMaxCapacityValidation, classNameValidation } from "../Validations"

export const useClasses = () => {

    const { setClasses } = useContext(ClassesContext)
    const [loading, setLoading] = useState(true)
    const [nameError,setNameError] = useState("")
    const [descriptionError,setDescriptionError] = useState("")
    const [maxCapacityError,setMaxCapacityError] = useState("")
    const [durationError,setDurationError] = useState("")
    const [photoError,setPhotoError] = useState("")
    const getClasses = useCallback(async () => {
        try {
            setLoading(true)
            const classes = await classesService()
            setClasses(classes)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getInstructorClasses = async ({jwt}) => {
        const res = await classesInstructorService({ jwt })
        setClasses(res)
    }


    const createClass = async ({name, photo, description, maxCapacity, duration, instructorEmail}) =>{

        const nameValidation = classNameValidation({name})
        const descriptionValidation = classDescriptionValidation({description})
        const maxCapacityValidation = classMaxCapacityValidation({maxCapacity})
        const durationValidation = classDurationValidation({duration})
        
        setNameError(nameValidation)
        setDescriptionError(descriptionValidation)
        setMaxCapacityError(maxCapacityValidation)
        setDurationError(durationValidation)
        setPhotoError( photo ? "" : "Debe subir una foto")

        if(nameValidation || descriptionValidation || maxCapacityValidation || durationValidation || !photo){
            return false
        }
        try{
            await createClassService({ name, photo, description, maxCapacity, duration, instructorEmail })
            return true
        }catch(error){
            console.log(error)
            return false
        }
        
    }


    return {
        loading,
        getClasses,
        getInstructorClasses,
        createClass,
        nameError,
        descriptionError,
        maxCapacityError,
        durationError,
        photoError,

    }
}
