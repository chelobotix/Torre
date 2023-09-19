import { v4 as uuidv4 } from 'uuid'
import { type IUser } from '../../interfaces/userInterface'
import { Link } from 'react-router-dom'
import { AiFillHeart } from 'react-icons/ai'

const UserCard: React.FC<IUser> = (user) => {
    const handleFavorites = (user: IUser): void => {
        const favorite = {
            name: user.name,
            professionalHeadline: user.professionalHeadline,
            image: user.imageUrl,
            url: `https://torre.ai/${user.username}`,
        }
        let aux = localStorage.getItem('fav')
        if (aux !== null) {
            aux = JSON.parse(aux)
        }
        if (Array.isArray(aux)) {
            aux.push(favorite)
            localStorage.setItem('fav', JSON.stringify(aux))
        }
    }
    return (
        <li key={uuidv4()} className="flex flex-col bg-slate-700 px-2 py-1">
            <div
                onClick={() => {
                    handleFavorites(user)
                }}
                className="self-end"
            >
                <AiFillHeart size={20} style={{ color: '#cddc39' }} />
            </div>
            <Link to={`https://torre.ai/${user.username}`}>
                <div className="pentagon w-10 min-w-[80px] bg-gray-600 flex justify-center p-1">
                    {user.imageUrl === null ? (
                        <p className="pentagon text-lg text-white p-4">{user.name[0]}</p>
                    ) : (
                        <img src={user.imageUrl} alt="user_img" className="pentagon w-[65px]" />
                    )}
                </div>
                <p className="text-lime-400 truncate">{user.name}</p>
                <p className="text-slate-300 truncate">{user.professionalHeadline}</p>
            </Link>
            <div className="flex justify-end gap-1">
                <button className="hidden text-lime-400 border-2 border-lime-400 rounded-xl py-1 px-3 md:inline-block">
                    Message
                </button>
                <div className="bg-lime-400 p-[1px] rounded-xl ">
                    <button className="border-2 rounded-xl border-black py-1 px-3">Signal</button>
                </div>
            </div>
        </li>
    )
}
export { UserCard }
