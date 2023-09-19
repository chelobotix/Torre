import { type IUser } from '../../interfaces/userInterface'
import { v4 as uuidv4 } from 'uuid'

const SearchResult: React.FC<IUser> = (user) => {
    return (
        <li key={uuidv4()}>
            {user.verified && <p>verified</p>}
            <div>{user.imageUrl === null ? user.name[0] : <img src={user.imageUrl} alt="" width={'100px'} />}</div>
            <p>{user.name}</p>
            <p>{user.professionalHeadline}</p>
        </li>
    )
}
export { SearchResult }
