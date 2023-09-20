import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { userFetcher } from '../../api/userFetcher'
import { type IUser } from '../../interfaces/userInterface'
import { Loader } from '../Loader/Loader'
import { QueryHistory } from '../QueryHistory/QueryHistory'
import { SearchResult } from '../SearchResult/SearchResult'
import { UserCard } from '../UserCard/UserCard'
import useLocalStorage from 'use-local-storage'

interface ISearch {
    text: string
    users: IUser[] | null
    isLoading: boolean
    isOnFocus: boolean
    result: IUser[] | null
}

const initialState: ISearch = {
    text: '',
    users: [],
    isLoading: false,
    isOnFocus: false,
    result: [],
}

const Search: React.FC = () => {
    const [search, setSearch] = useState<ISearch>(initialState)
    const [queries, setQueries] = useLocalStorage<string[]>('queries', [])
    const firstRenderRef = useRef(true)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch((prev) => ({ ...prev, isLoading: true, text: e.target.value, isOnFocus: true }))
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            setSearch((prev) => ({
                ...prev,
                result: search.users,
                isOnFocus: false,
            }))
            setQueries((prev) => [search.text, ...prev])
        }
    }

    const deleteLocalStorage = (): void => {
        setQueries([])
        setSearch((prev) => ({ ...prev, history: [] }))
    }

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
        } else {
            setSearch((prev) => ({ ...prev, isLoading: true, history: queries }))
            const queryObj = {
                query: search.text,
                limit: 20,
            }
            void userFetcher('https://torre.ai/api/entities/_searchStream', queryObj, setSearch)
        }
    }, [search.text, queries])
    return (
        <div className="flex flex-col items-center mt-3">
            <div className="flex flex-col items-center h-auto w-4/5 my-2 p-1 max-w-xl border-2 border-lime-400">
                <h2 className="text-white">Recent search queries</h2>
                <ul className="flex flex-wrap justify-center p-1 gap-1">
                    {queries.map((query, index) => {
                        if (index < 10) {
                            return <QueryHistory key={uuidv4()} query={query} />
                        }
                        return null
                    })}
                </ul>
                {queries.length !== 0 && (
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
            <div className={search.isOnFocus ? 'flex justify-center w-4/5 max-w-xl' : 'hidden'}>
                <ul className="flex flex-col bg-slate-500 w-full h-96 overflow-auto">
                    {search.users !== null && search.isOnFocus
                        ? search.users.map((user: IUser) => {
                              return <SearchResult key={uuidv4()} {...user} />
                          })
                        : null}
                </ul>
            </div>
            <div className="w-4/5 max-w-xl mt-3">
                <ul className="flex flex-col gap-2">
                    {search.result !== null
                        ? search.result.map((user) => <UserCard key={uuidv4()} user={user} />)
                        : null}
                </ul>
            </div>
        </div>
    )
}
export { Search, type ISearch }
