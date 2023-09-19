import { type ISearch } from '../components/Search/Search'
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

const userFetcher = async (
    url: string,
    data: IBody,
    setSearch: React.Dispatch<React.SetStateAction<ISearch>>
): Promise<any> => {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    return await fetch(url, requestOptions)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return await response.text() // response is not JSON
        })
        .then((responseData) => {
            const result = joinObjects(responseData) // Convert response in JSON
            setSearch((prev) => ({ ...prev, isLoading: false, users: result }))
            return joinObjects(responseData)
        })
        .catch((error) => {
            console.error('Fetch Error:', error)
            throw error
        })
}

export { userFetcher }
