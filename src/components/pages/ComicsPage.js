import { useState } from 'react';
import { Helmet } from 'react-helmet';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';

const ComicsPage = () => {
    // eslint-disable-next-line no-unused-vars
    const [selectedComics, setSelectedComics] = useState(null)
    const onComicsSelected = (id) => {
        setSelectedComics(id)
    }
    return (
        <>
            <Helmet>
                <meta name="description" content="Page with list of our comics" />
                <title>Comics page</title>
            </Helmet>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList onComicsSelected={onComicsSelected} />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;