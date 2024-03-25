import { ENDPOINT } from "./settings"

export const sessionsClientsService = async ({jwt,UUIDClass,date}) =>{
    const res = await fetch(`${ENDPOINT}/sessionsClients/${UUIDClass}/${date}`,
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