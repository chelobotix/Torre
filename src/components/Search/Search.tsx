import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { userFetcher } from '../../api/userFetcher'
import { HandleLocalStorage } from '../../helper/LocalStorage'
import { type IUser } from '../../interfaces/userInterface'
import { Loader } from '../Loader/Loader'
import { QueryHistory } from '../QueryHistory/QueryHistory'
import { SearchResult } from '../SearchResult/SearchResult'
import { UserCard } from '../UserCard/UserCard'

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
            const query = `${search.text}`
            setSearch((prev) => ({
                ...prev,
                result: search.users,
                history: [query, ...search.history],
                isLoading: true,
            }))
        }
    }

    const deleteLocalStorage = (): void => {
        userLocalStorage.reset()
        setSearch((prev) => ({ ...prev, history: [] }))
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
            <h2 className="text-white">Recent search queries</h2>
            <div className="flex flex-col items-center h-auto w-4/5 my-2 p-1 max-w-xl">
                <ul className="flex flex-wrap justify-center p-1 gap-1">
                    {search.history.map((query, index) => {
                        if (index < 10) {
                            return <QueryHistory key={uuidv4()} query={query} />
                        }
                        return null
                    })}
                </ul>
                {search.history.length !== 0 && (
                    <p
                        onClick={deleteLocalStorage}
                        className="bg-white text-black text-xs px-2 py-1 rounded-xl cursor-pointer"
                    >
                        Delete All
                    </p>
                )}
            </div>
            <input
                type="text"
                value={search.text}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                placeholder="search people by name"
                className="text-white bg-black border-2 border-white rounded-2xl w-4/5 p-2 max-w-xl"
            />
            {search.isLoading && <Loader />}
            {}
            <div className={search.isLoading ? 'hidden' : 'flex justify-center w-4/5 max-w-xl'}>
                <ul className="flex flex-col bg-slate-500 w-full h-96 overflow-auto">
                    {search.users !== null
                        ? search.users.map((user: IUser) => {
                              return <SearchResult key={uuidv4()} {...user} />
                          })
                        : null}
                </ul>
            </div>
            <div className="w-4/5 max-w-xl mt-3">
                <ul className="flex flex-col gap-2">
                    {search.result !== null ? search.result.map((user) => <UserCard key={uuidv4()} {...user} />) : null}
                </ul>
            </div>
        </div>
    )
}
export { Search, type ISearch }
