const ENDPOINT = ' http://localhost:1234'

export const registerService = async ({ email, password,role }) => {

    const res = await fetch(`${ENDPOINT}/users/register`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password,role })

        }
    )
    if (!res.ok) throw new Error('Response is NOT ok')
    
    
    

}