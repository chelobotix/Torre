interface IQueryHistoryProps {
    query: string
}

const QueryHistory: React.FC<IQueryHistoryProps> = ({ query }) => {
    return <li className="bg-slate-400 py-1 px-2 rounded-xl">{query}</li>
}
export { QueryHistory }
