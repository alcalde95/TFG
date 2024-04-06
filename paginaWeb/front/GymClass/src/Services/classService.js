import { ENDPOINT } from "./settings"


export const classesService = async ({ name, maxCapacity, minDuration, maxDuration }) => {
    console.log(`${ENDPOINT}/classes/?name=${name}&maxCapacity=${maxCapacity}&minDuration=${minDuration}&maxDuration=${maxDuration}`)
    const res = await fetch(`${ENDPOINT}/classes/?name=${name}&maxCapacity=${maxCapacity}&minDuration=${minDuration}&maxDuration=${maxDuration}`,
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

export const classService = async ({ uuidClass }) => {

    const res = await fetch(`${ENDPOINT}/classes/${uuidClass}`,
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
    if (!res.ok) throw new Error('Response is NOT ok')
    return 
}


export const updateClassService = async ({ UUIDClass, name, photo, description, maxCapacity, duration,instructorEmail,jwt }) => {
    const res = await fetch(`${ENDPOINT}/classes/`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `token ${jwt}`,
                'Content-Type': 'application/json',
            }
            ,
            body: JSON.stringify({ UUIDClass,name, photo, description, maxCapacity, duration,instructorEmail })
        }
    )
    if (!res.ok) console.log(res)
    return 
}

export const getManagedClassesInstructorService = async ({ jwt }) => {
    const res = await fetch(`${ENDPOINT}/classes/sessions/`,
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

export const deleteClassService = async ({ uuidClass, jwt }) => {
    const res = await fetch(`${ENDPOINT}/classes/${uuidClass}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${jwt}`
            }
        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    return
}