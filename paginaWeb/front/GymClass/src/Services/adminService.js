const ENDPOINT = ' http://localhost:1234'

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
    return res.json()
    

}