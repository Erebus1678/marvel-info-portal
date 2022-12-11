import ErrorMessage from '../errorMessage/ErrorMessage'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta name="description" content='404 page' />
                <title>404</title>
            </Helmet>
            <ErrorMessage />
            <p style={{ 'textAlign': "center", 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn`t exist</p>
            <Link
                className="button button__main button__long"
                to='marvel-info-portal'>
                <div className="inner">Go home</div>
            </Link>
        </div>
    )
}
export default Page404