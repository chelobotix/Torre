import { useState, useEffect, useRef } from 'react'
import { userFetcher } from '../../api/userFetcher'
import { v4 as uuidv4 } from 'uuid'
import { type IUser } from '../../interfaces/userInterface'

const Search: React.FC = () => {
    const [search, setSearch] = useState<string>('')
    const [users, setUsers] = useState<IUser[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const firstRenderRef = useRef(true)
    console.log(users)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setIsLoading(true)
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
        } else {
            setIsLoading(true)
            const queryObj = {
                query: search,
                limit: 20,
            }
            void userFetcher('https://torre.ai/api/entities/_searchStream', queryObj, setUsers, setIsLoading)
        }
    }, [search])
    return (
        <div>
            <input type="text" value={search} onChange={handleSearch} />
            {isLoading && <p>loading.!!!!!</p>}
            <div>
                <ul>
                    {users === null ? (
                        <p>Loading...</p>
                    ) : (
                        users.map((user: IUser) => {
                            return <li key={uuidv4()}>{user.name}</li>
                        })
                    )}
                </ul>
            </div>
        </div>
    )
}
export { Search }
