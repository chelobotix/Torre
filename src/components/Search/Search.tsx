import { useState, useEffect, useRef } from 'react'
import { userFetcher } from '../../api/userFetcher'
import { v4 as uuidv4 } from 'uuid'
import { type IUser } from '../../interfaces/userInterface'
import { UserCard } from '../UserCard/UserCard'
import { SearchResult } from '../SearchResult/SearchResult'
import { Loader } from '../Loader/Loader'

interface ISearch {
    text: string
    users: IUser[] | null
    isLoading: boolean
    result: IUser[] | null
}

const initialState: ISearch = {
    text: '',
    users: [],
    isLoading: false,
    result: [],
}

const Search: React.FC = () => {
    const [search, setSearch] = useState<ISearch>(initialState)
    const firstRenderRef = useRef(true)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch((prev) => ({ ...prev, isLoading: true, text: e.target.value }))
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            setSearch((prev) => ({ ...prev, result: search.users }))
        }
    }

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
        } else {
            setSearch((prev) => ({ ...prev, isLoading: true }))
            const queryObj = {
                query: search.text,
                limit: 20,
            }
            void userFetcher('https://torre.ai/api/entities/_searchStream', queryObj, setSearch)
        }
    }, [search.text])
    return (
        <div>
            <input type="text" value={search.text} onChange={handleSearchChange} onKeyDown={handleSearchKeyDown} />
            {search.isLoading && <Loader />}
            <div>
                <ul>
                    {search.users !== null
                        ? search.users.map((user: IUser) => {
                              return <SearchResult key={uuidv4()} {...user} />
                          })
                        : null}
                </ul>
            </div>
            <hr />
            <div>
                {search.result !== null ? search.result.map((user) => <UserCard key={uuidv4()} {...user} />) : null}
            </div>
        </div>
    )
}
export { Search, type ISearch }
