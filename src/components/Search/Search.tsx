import { useState, useEffect, useRef } from 'react'
import { userFetcher } from '../../api/userFetcher'
import { v4 as uuidv4 } from 'uuid'
import { type IUser } from '../../interfaces/userInterface'

const Search: React.FC = () => {
    const [search, setSearch] = useState<string>('')
    const [users, setUsers] = useState<IUser[] | null>(null)
    const firstRenderRef = useRef(true)
    console.log(users)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
        } else {
            const queryObj = {
                query: search,
                limit: 20,
            }
            void userFetcher('https://torre.ai/api/entities/_searchStream', queryObj, setUsers)
        }
    }, [search])
    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
            />
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
