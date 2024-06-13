import { ENDPOINT } from "./settings"


export const registerService = async ({ email, password }) => {

    const res = await fetch(`${ENDPOINT}/users/clients/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password,role:'C' })

        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
}
