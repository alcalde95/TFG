import { ENDPOINT } from "./settings"

export const loginService = async ({ email, password }) => {

    const res = await fetch(`${ENDPOINT}/users/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })

        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')

    return res.json()

}