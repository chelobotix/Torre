import { type IUser } from '../../interfaces/userInterface'
import { v4 as uuidv4 } from 'uuid'
import { BsPatchCheckFill } from 'react-icons/bs'

const SearchResult: React.FC<IUser> = (user) => {
    return (
        <li key={uuidv4()} className="px-3 flex items-center gap-2 p-1 hover:bg-slate-400 hover:cursor-pointer">
            <div className="pentagon p-1 w-7 min-w-[40px] bg-gray-600 flex justify-center">
                {user.imageUrl === null ? (
                    <p className="pentagon text-lg text-white p-1">{user.name[0]}</p>
                ) : (
                    <img src={user.imageUrl} alt="" className="pentagon w-8" />
                )}
            </div>
            <div className="flex flex-col items-start overflow-hidden">
                <div className="flex gap-1">
                    <p className="text-sm whitespace-nowrap text-ellipsis">{user.name}</p>
                    {user.verified && <BsPatchCheckFill style={{ color: 'white' }} />}
                </div>
                <p className="text-sm">{user.professionalHeadline}</p>
            </div>
        </li>
    )
}
export { SearchResult }
