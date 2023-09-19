import { joinObjects } from '../helper/joinObjects'

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

const userFetcher = (url: string, data: IBody) => {
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
    return fetch(url, requestOptions)
        .then((response) => {
            // Check if the response status is OK (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            // Parse the JSON response and return it
            return response.text()
        })
        .then((responseData) => {
            // Handle the JSON response data here
            joinObjects(responseData)
            return responseData // You can return the data to the caller if needed
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch or parsing
            console.error('Fetch Error:', error)
            throw error // You can rethrow the error or handle it as needed
        })
}

export { userFetcher }
