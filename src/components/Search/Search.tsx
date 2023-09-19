import { useState, useEffect } from 'react'
import { userFetcher } from '../../api/UserFetcher'

const Search: React.FC = () => {
    const [search, setSearch] = useState('')
    const [result, setResult] = useState([])
    console.log(search)

    useEffect(() => {
        const queryObj = {
            query: 'marcelo alarcon',
            limit: 20,
        }
        userFetcher('https://torre.ai/api/entities/_searchStream', queryObj)
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
        </div>
    )
}
export { Search }
