import { Link } from 'react-router-dom'

const Error404: React.FC = () => {
    return (
        <div>
            <h1>This page doesn&apos;t exist</h1>
            <Link to="/Home">Return to Home</Link>
        </div>
    )
}
export { Error404 }
