import { useState } from 'react';

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
            <AppBanner />
            <ErrorBoundary>
                <ComicsList onComicsSelected={onComicsSelected} />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;