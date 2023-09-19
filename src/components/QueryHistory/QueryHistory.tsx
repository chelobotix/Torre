interface IQueryHistoryProps {
    query: string
}

const QueryHistory: React.FC<IQueryHistoryProps> = ({ query }) => {
    return (
        <li>
            <p>{query}</p>
        </li>
    )
}
export { QueryHistory }
