import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const Favorites: React.FC = () => {
    let favorites = localStorage.getItem('fav')
    if (favorites !== null) {
        favorites = JSON.parse(favorites)
    }
    return (
        <div className="flex flex-col items-center pl-10">
            <h2 className="text-white text-xl mb-3">Favorites</h2>
            <ul>
                {Array.isArray(favorites) &&
                    favorites.map((user) => (
                        <li key={uuidv4()} className="mb-7">
                            <img src={user.image} alt="" />
                            <p className="text-lime-400">{user.name}</p>
                            <p className="text-slate-500 mb-3">{user.professionalHeadline}</p>
                            <Link className="bg-lime-400 text-black p-1 rounded-xl" to={user.url}>
                                Torre Profile
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
export { Favorites }
