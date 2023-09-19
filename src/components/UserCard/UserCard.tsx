import { v4 as uuidv4 } from 'uuid'
import { type IUser } from '../../interfaces/userInterface'
import { Link } from 'react-router-dom'

const UserCard: React.FC<IUser> = (user) => {
    return (
        <li key={uuidv4()}>
            <div>
                <button>Favorite</button>
            </div>
            <Link to={`https://torre.ai/${user.username}`}>
                <div>{user.imageUrl === null ? user.name[0] : <img src={user.imageUrl} alt="" width={'100px'} />}</div>
                <p>{user.name}</p>
                <p>{user.professionalHeadline}</p>
            </Link>
            <div>
                <button>Message</button>
                <button>Signal</button>
            </div>
        </li>
    )
}
export { UserCard }
