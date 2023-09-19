import style from './Loader.module.css'

const Loader: React.FC = () => {
    return (
        <div className={`${style.loaderContainer}`}>
            <div className={`${style.loader}`}>
                <div className={`${style.loaderBar}`}></div>
            </div>
        </div>
    )
}
export { Loader }
