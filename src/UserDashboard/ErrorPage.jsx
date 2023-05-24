import { useRouteError } from 'react-router-dom'
import '../styles/Error.css'


export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)

    return <div className="errorPage-container">
        <div className="errorPage-title">404</div>
        <div className="errorPage-text">Une erreur s'est produite</div>
        <p><i>{ error.message  || error.statusText }</i></p>
    </div>
}