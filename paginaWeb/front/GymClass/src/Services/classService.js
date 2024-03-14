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

export const createClassService = async ({ name, photo, description, maxCapacity, duration, instructorEmail }) => {
    const res = await fetch(`${ENDPOINT}/classes/   `,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
            ,
            body: JSON.stringify({ name, photo, description, maxCapacity, duration, instructorEmail })
        }
    )
    console.log(res)
    if (!res.ok) throw new Error('Response is NOT ok')
    return 'ok'
}
