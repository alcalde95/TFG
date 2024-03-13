import { ENDPOINT } from "./settings"


export const classesService = async (/*{ jwt }*/) => {

    const res = await fetch(`${ENDPOINT}/classes/`,
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

export const classService = async ({ classId }) => {

    const res = await fetch(`${ENDPOINT}/classes/${classId}`,
        {
            method: 'GET'//,
            /*headers: {
                'Authorization': `token ${jwt}`
            }*/
        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    return res.json()
}


export const classesInstructorService = async ({ jwt }) => {

    const res = await fetch(`${ENDPOINT}/classes/instructor/`,
        {
            method: 'GET',
            headers: {
                'Authorization': `token ${jwt}`
            }
        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    return res.json()
}
