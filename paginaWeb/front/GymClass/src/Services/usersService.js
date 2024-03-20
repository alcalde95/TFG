import { ENDPOINT } from "./settings"

export const getAllInstructorsService = async ({ jwt }) => {

    const res = await fetch(`${ENDPOINT}/users/instructors/`,
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