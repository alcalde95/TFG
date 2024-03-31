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
export const updateSessionsClientsService = async ({jwt,uuidClass,dataTime,clientEmail,attend,justified}) =>{
    const res = await fetch(`${ENDPOINT}/sessionsClients/${uuidClass}/${dataTime}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dataTime,uuidClass,clientEmail,attend,justified})

        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    return 
}