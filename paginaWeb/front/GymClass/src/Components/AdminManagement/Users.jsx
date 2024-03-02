import { User } from "./User"

const ListOfUsers = ({ users }) => {
    //preguntar a stephan o dani

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-2 w-full justify-between ">
            {
                users.map((user) => (<User key={user.email} user={user} />))

            }
        </ul>
    )
}

const NoUsers = ({ role }) => {
    return (
        <p>No hay ningún {role} </p>
    )
}

export const Users = ({ users, role }) => {
    const hasUsers = users?.length > 0

    return (

        hasUsers
            ? <ListOfUsers users={users} role={role} />
            : <NoUsers role={role} />

    )
}