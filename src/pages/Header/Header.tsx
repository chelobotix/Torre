import torre from '../../assets/torre.svg'
import hamburguer from '../../assets/hamburguer.svg'

const Header: React.FC = () => {
    return (
        <div className="flex px-2 h-14">
            <div className="flex gap-2">
                <img src={hamburguer} alt="" width="20px" />
                <img src={torre} alt="" width="130px" />
            </div>
            <ul className="hidden md:flex">
                <li>search</li>
                <li>post a job</li>
                <li>Search Jobs</li>
                <li>Cultural Fit</li>
                <li>Preferences</li>
                <li>Messages</li>
                <li>Notifications</li>
                <li>Help</li>
                <li>You</li>
            </ul>
        </div>
    )
}
export { Header }
