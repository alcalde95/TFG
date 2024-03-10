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