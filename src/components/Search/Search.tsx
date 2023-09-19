import { useState, useEffect, useRef } from 'react'
import { userFetcher } from '../../api/userFetcher'
import { v4 as uuidv4 } from 'uuid'
import { type IUser } from '../../interfaces/userInterface'
import style from './Search.module.css'
import { UserCard } from '../UserCard/UserCard'
import { SearchResult } from '../SearchResult/SearchResult'

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
    console.log(search.users)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch((prev) => ({ ...prev, isLoading: true, text: e.target.value }))
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
            <input type="text" value={search.text} onChange={handleSearch} />
            {search.isLoading && (
                <div className={`${style.loaderContainer}`}>
                    <div className={`${style.loader}`}>
                        <div className={`${style.loaderBar}`}></div>
                    </div>
                </div>
            )}
            <div>
                <ul>
                    {search.users === null
                        ? null
                        : search.users.map((user: IUser) => {
                              return <SearchResult key={uuidv4()} {...user} />
                          })}
                </ul>
            </div>
        </div>
    )
}
export { Search, type ISearch }
