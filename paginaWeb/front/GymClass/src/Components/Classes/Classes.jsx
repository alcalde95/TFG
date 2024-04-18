import { Class } from "./Class"

const ListOfClasses = ({ classes, editable,managed }) => {
    
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 w-full place-items-center lg:place-items-stretch max-w-7xl">
            {
                classes.map((c) => (<Class key={c.UUID_Class} c={c} editable={editable} managed={managed}/>))
            }
        </ul>
    )
}

const NoClasses = () => {
    return (
        <p>No hay clases </p>
    )
}

export const Classes = ({ classes, editable,managed=false }) => {
    const hasClasses = classes?.length > 0
    return (

        hasClasses
            ? <ListOfClasses classes={classes} editable={editable} managed = {managed} />
            : <NoClasses  />

    )
}