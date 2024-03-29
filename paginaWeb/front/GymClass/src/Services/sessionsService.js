import { ENDPOINT } from "./settings"


export const sessionsService = async ({ uuidClass, jwt }) => {

    const res = await fetch(`${ENDPOINT}/sessions/${uuidClass}`,
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


export const createSessionService = async ({ uuidClass, dataTime, instructorEmail, jwt }) => {

    const res = await fetch(`${ENDPOINT}/sessions/`,
        {
            method: 'POST',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dataTime, uuidClass,instructorEmail })
        }
    )
    if (!res.ok) throw new Error(res)
    return
}
export const updateSessionService = async ({ uuidClass, dataTime, instructorEmail, jwt }) => {
    const res = await fetch(`${ENDPOINT}/sessions/`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dataTime, uuidClass,instructorEmail })
        }
    )
    if (!res.ok) throw new Error(res)
    return
}


export const deleteSessionService = async ({ uuidClass,dataTime, jwt }) => {
    const res = await fetch(`${ENDPOINT}/sessions/`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuidClass,dataTime })
        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    return
}