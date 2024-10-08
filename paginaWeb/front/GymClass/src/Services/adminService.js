import { ENDPOINT } from "./settings"



export const allUsersService = async ({ jwt }) => {

    const res = await fetch(`${ENDPOINT}/users/all`,
        {
            method: 'GET',
            headers: {
                'Authorization': `token ${jwt}`
            },

        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')

    return res.json()

}
export const allClientsService = async ({ jwt }) => {

    const res = await fetch(`${ENDPOINT}/users/clients/`,
        {
            method: 'GET',
            headers: {
                'Authorization': `token ${jwt}`
            },

        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')

    return res.json()

}

export const deleteUserService = async ({ email, jwt }) => {

    const res = await fetch(`${ENDPOINT}/users/${email}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${jwt}`
            },

        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    return 'ok'


}

export const updateUserService = async ({ email, password, role, jwt }) => {


    const res = await fetch(`${ENDPOINT}/users/`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, role })
        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
}
export const updateClientService = async ({ email,validated, jwt }) => {


    const res = await fetch(`${ENDPOINT}/users/clients/`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, validated})
        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
}

export const createUserService = async ({ email, password,role,jwt }) => {

    const res = await fetch(`${ENDPOINT}/users/`,
        {
            method: 'POST',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password,role })

        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
}