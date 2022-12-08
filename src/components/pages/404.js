import ErrorMessage from '../errorMessage/ErrorMessage'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{ 'textAlign': "center", 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn`t exist</p>
            <Link
                className="button button__main button__long"
                to='marvel-info-portal/'>
                <div className="inner">Go home</div>
            </Link>
        </div>
    )
}
export default Page404