import { Class } from "./Class"

const ListOfClasses = ({ classes, editable }) => {
    
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2  gap-4 p-2 w-full place-items-center ">
            {
                classes.map((c) => (<Class key={c.UUID_Class} c={c} editable={editable} />))
            }
        </ul>
    )
}

const NoClasses = () => {
    return (
        <p>No hay clases </p>
    )
}

export const Classes = ({ classes, editable }) => {
    const hasClasses = classes?.length > 0
    return (

        hasClasses
            ? <ListOfClasses classes={classes} editable={editable} />
            : <NoClasses  />

    )
}