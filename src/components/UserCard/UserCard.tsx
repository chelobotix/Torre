import { v4 as uuidv4 } from 'uuid'
import { type IUser } from '../../interfaces/userInterface'
import { Link } from 'react-router-dom'
import { AiFillHeart } from 'react-icons/ai'
import useLocalStorage from 'use-local-storage'
import { useEffect } from 'react'

interface IFavorites {
    name: string
    professionalHeadline: string
    image: string
    url: string
}

interface UserCardProps {
    user: IUser
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const [, setFavorites] = useLocalStorage<IFavorites[]>('favorites', [])
    const [, setTest] = useLocalStorage<string>('test', '')

    const handleFavorites = (user: IUser): void => {
        const favorite: IFavorites = {
            name: user.name,
            professionalHeadline: user.professionalHeadline,
            image: user.imageUrl,
            url: `https://torre.ai/${user.username}`,
        }
        setFavorites((prev) => [favorite, ...prev])
        setTest('dsad')
    }
    useEffect(() => {
        console.log('effect')
        setTest('mono')
    }, [])

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
export { UserCard, type IFavorites }
