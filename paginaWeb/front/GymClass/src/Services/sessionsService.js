import { ENDPOINT } from "./settings"


export const sessionsService = async ({ classId }) => {

    const res = await fetch(`${ENDPOINT}/sessions/${classId}`,
        {
            method: 'GET'//,
            /*headers: {
                'Authorization': `token ${jwt}`
            }*/,

        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')

    return res.json()

}
