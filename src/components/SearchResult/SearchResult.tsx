import { type IUser } from '../../interfaces/userInterface'
import { v4 as uuidv4 } from 'uuid'

const SearchResult: React.FC<IUser> = (user) => {
    return (
        <li key={uuidv4()} className="px-3 flex items-center gap-2">
            {user.verified && <p>verified</p>}
            <div className="pentagon p-1 w-16 bg-gray-600 flex justify-center">
                {user.imageUrl === null ? (
                    <p className="pentagon text-2xl text-white p-2">{user.name[0]}</p>
                ) : (
                    <img src={user.imageUrl} alt="" className="pentagon w-14" />
                )}
            </div>
            <div className="flex flex-col items-start">
                <p>{user.name}</p>
                <p>{user.professionalHeadline}</p>
            </div>
        </li>
    )
}
export { SearchResult }
