const Header: React.FC = () => {
    return (
        <div className="flex">
            <div className="flex">
                <p>Hamburguer</p>
                <p>Torre.ai</p>
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
