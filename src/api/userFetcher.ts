import { joinObjects } from '../helper/joinObjects'
import { type IUser } from '../interfaces/userInterface'

interface IBody {
    query: string
    limit: number
    torreGgId?: string
    identityType?: string
    meta?: boolean
    excluding?: string[]
    excludedpeople?: string[]
    excludeContacts?: boolean
}

const userFetcher = async (
    url: string,
    data: IBody,
    setResult: React.Dispatch<React.SetStateAction<IUser[] | null>>
): Promise<any> => {
    // Define the request options, including method, headers, and body
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            // You can include other headers here if needed
        },
        body: JSON.stringify(data), // Convert the data to a JSON string
    }

    // Make the POST request using fetch
    return await fetch(url, requestOptions)
        .then(async (response) => {
            // Check if the response status is OK (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            // Parse the JSON response and return it
            return await response.text()
        })
        .then((responseData) => {
            const result = joinObjects(responseData)
            setResult(result)
            return joinObjects(responseData) // You can return the data to the caller if needed
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch or parsing
            console.error('Fetch Error:', error)
            throw error // You can rethrow the error or handle it as needed
        })
}

export { userFetcher }
