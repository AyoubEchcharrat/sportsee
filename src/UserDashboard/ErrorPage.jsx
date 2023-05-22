import { useRouteError } from 'react-router-dom'
import '../styles/Error.css'


export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)

    return <div className="errorPage-container">
        <div className="errorPage-title">404</div>
        <div className="errorPage-text">Cette page n'est pas disponible</div>
        <p><i>{error.statusText || error.message}</i></p>
    </div>
}