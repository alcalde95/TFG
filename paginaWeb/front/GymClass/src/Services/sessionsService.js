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
    console.log(res)
    if (!res.ok) throw new Error(res)
    return
}