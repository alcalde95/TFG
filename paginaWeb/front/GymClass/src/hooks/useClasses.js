import { useContext, useState } from "react"
import { ClassesContext } from "../Contexts/ClassesContext"
import { classService, classesInstructorService, classesService, clientClassesService, createClassService, deleteClassService, getManagedClassesInstructorService, updateClassService } from "../Services/classService"
import { classDescriptionValidation, classDurationValidation, classMaxCapacityValidation, classNameValidation } from "../Validations"

export const useClasses = () => {

    const { setClasses } = useContext(ClassesContext)
    const [loading, setLoading] = useState(true)
    const [nameError, setNameError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [maxCapacityError, setMaxCapacityError] = useState("")
    const [durationError, setDurationError] = useState("")
    const [photoError, setPhotoError] = useState("")
    const [managedClasses, setManagedClasses] = useState([])

    const getClasses = async ({ name = '', maxCapacity = '', minDuration = '', maxDuration = '' } = {}) => {
        try {
            setLoading(true)
            const classes = await classesService({ name, maxCapacity, minDuration, maxDuration })
            setClasses(classes)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const getClassesClient = async ({jwt}) => {
        try {
            setLoading(true)
            const classes = await clientClassesService({ jwt })
            setClasses(classes)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }


    const getInstructorClasses = async ({ jwt }) => {
        const res = await classesInstructorService({ jwt })
        setClasses(res)
    }

    const getClass = async ({ uuidClass, jwt }) => {
        try {
            const res = await classService({ uuidClass, jwt })
            setClasses(res)
        } catch (e) {
            console.error(e.message)
        }
    }

    const getManagedClasses = async ({ jwt }) => {
        try {
            const res = await getManagedClassesInstructorService({ jwt })
            setManagedClasses(res)
        } catch (e) {
            console.error(e.message)
        }
    }



    const createClass = async ({jwt, name, photo, description, maxCapacity, duration, instructorEmail }) => {

        const nameValidation = classNameValidation({ name })
        const descriptionValidation = classDescriptionValidation({ description })
        const maxCapacityValidation = classMaxCapacityValidation({ maxCapacity })
        const durationValidation = classDurationValidation({ duration })

        setNameError(nameValidation)
        setDescriptionError(descriptionValidation)
        setMaxCapacityError(maxCapacityValidation)
        setDurationError(durationValidation)
        setPhotoError(photo ? "" : "Debe subir una foto")

        if (nameValidation || descriptionValidation || maxCapacityValidation || durationValidation || !photo) {
            return false
        }
        try {
            await createClassService({jwt, name, photo, description, maxCapacity, duration, instructorEmail })
            return true
        } catch (error) {
            console.log(error)
            return false
        }

    }

    const updateClass = async ({ name, photo, description, maxCapacity, duration, instructorEmail, jwt, UUIDClass }) => {

        const nameValidation = classNameValidation({ name })
        const descriptionValidation = classDescriptionValidation({ description })
        const maxCapacityValidation = classMaxCapacityValidation({ maxCapacity })
        const durationValidation = classDurationValidation({ duration })

        setNameError(nameValidation)
        setDescriptionError(descriptionValidation)
        setMaxCapacityError(maxCapacityValidation)
        setDurationError(durationValidation)
        setPhotoError(photo ? "" : "Debe subir una foto")

        if (nameValidation || descriptionValidation || maxCapacityValidation || durationValidation || !photo) {
            return false
        }
        try {
            await updateClassService({ name, photo, description, maxCapacity, duration, instructorEmail, jwt, UUIDClass })
            return true
        } catch (error) {
            console.log(error)
            return false
        }

    }

    const deleteClass = async ({ uuidClass, jwt }) => {
        try {
            await deleteClassService({ uuidClass, jwt })
            return true
        } catch (e) {
            console.error(e.message)
            return false
        }
    }



    return {
        loading,
        getClasses,
        getInstructorClasses,
        getClassesClient,
        createClass,
        getClass,
        updateClass,
        getManagedClasses,
        deleteClass,
        nameError,
        descriptionError,
        maxCapacityError,
        durationError,
        photoError,
        managedClasses,

    }
}
