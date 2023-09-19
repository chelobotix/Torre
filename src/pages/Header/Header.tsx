import torre from '../../assets/torre.svg'
import hamburguer from '../../assets/hamburguer.svg'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
    return (
        <div className="flex justify-between items-center px-2 h-14 w-full">
            <div className="flex gap-2">
                <img src={hamburguer} alt="" width="20px" />
                <Link to="/home">
                    <img src={torre} alt="" width="130px" />
                </Link>
            </div>
            <div>
                <Link className="text-lime-400" to="/favorites">
                    Favorites
                </Link>
            </div>
        </div>
    )
}
export { Header }
