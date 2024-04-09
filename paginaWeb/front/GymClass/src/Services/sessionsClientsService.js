import { ENDPOINT } from "./settings"

export const sessionsClientsService = async ({ jwt, UUIDClass, date }) => {
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

export const enrollClientToSessionService = async ({ jwt, dataTime, uuidClass, clientEmail }) => {
    const res = await fetch(`${ENDPOINT}/sessionsClients/${uuidClass}/${dataTime}`,
        {
            method: 'POST',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clientEmail })
        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    return
}

export const updateSessionsClientsService = async ({ jwt, uuidClass, dataTime, clientEmail, attend, justified }) => {
    const res = await fetch(`${ENDPOINT}/sessionsClients/${uuidClass}/${dataTime}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dataTime, uuidClass, clientEmail, attend, justified })

        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    return
}
export const isEnrolledService = async ({ jwt, dataTime, uuidClass, clientEmail }) => {
    const res = await fetch(`${ENDPOINT}/sessionsClients/${uuidClass}/${dataTime}/isEnrolled`,
        {
            method: 'POST',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clientEmail })
        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    
    return res.json()
}
export const unenrollClientToSessionService = async ({ jwt, dataTime, uuidClass, clientEmail }) => {
    const res = await fetch(`${ENDPOINT}/sessionsClients/${uuidClass}/${dataTime}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clientEmail })
        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    
    return 
}