import { useState, useEffect, useRef } from 'react'
import { userFetcher } from '../../api/userFetcher'
import { v4 as uuidv4 } from 'uuid'
import { type IUser } from '../../interfaces/userInterface'
import { UserCard } from '../UserCard/UserCard'
import { SearchResult } from '../SearchResult/SearchResult'
import { Loader } from '../Loader/Loader'
import { HandleLocalStorage } from '../../helper/LocalStorage'
import { QueryHistory } from '../QueryHistory/QueryHistory'

const userLocalStorage = new HandleLocalStorage('users')
const aux = userLocalStorage.getData()

interface ISearch {
    text: string
    users: IUser[] | null
    isLoading: boolean
    result: IUser[] | null
    history: string[]
}

const initialState: ISearch = {
    text: '',
    users: [],
    isLoading: false,
    result: [],
    history: [],
}
if (Array.isArray(aux)) {
    initialState.history = [...aux]
}

const Search: React.FC = () => {
    const [search, setSearch] = useState<ISearch>(initialState)
    const firstRenderRef = useRef(true)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch((prev) => ({ ...prev, isLoading: true, text: e.target.value }))
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            const query = `${search.text}}`
            setSearch((prev) => ({ ...prev, result: search.users, history: [query, ...search.history] }))
        }
    }

    useEffect(() => {
        userLocalStorage.setData(search.history)
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
    }, [search.text, search.history])
    return (
        <div className="flex flex-col items-center mt-3">
            <h2>Recent search queries</h2>
            <div className="bg-red-800 h-20 overflow-auto w-4/5 my-2 p-1">
                <ul className="flex flex-wrap p-1">
                    {search.history.map((query, index) => {
                        if (index < 10) {
                            return <QueryHistory key={uuidv4()} query={query} />
                        }
                        return null
                    })}
                </ul>
            </div>
            <input
                type="text"
                value={search.text}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                placeholder="search people by name"
                className="text-white bg-black border-2 border-white rounded-2xl w-4/5 p-2"
            />
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
