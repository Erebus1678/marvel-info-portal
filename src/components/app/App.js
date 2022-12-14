import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout.js'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/singleCharacterLayout.js'));
const SinglePage = lazy(() => import('../pages/singlePage'));

const App = () => {

    return (
        <Router>
            <div className="app" >
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path='marvel-info-portal/' element={<MainPage />} />
                            <Route path='marvel-info-portal/comics' element={<ComicsPage />} />
                            <Route path='marvel-info-portal/comics/:comicId'
                                element={< SinglePage Component={SingleComicLayout} dataType='comic' />} />
                            <Route path="/characters/:id"
                                element={<SinglePage Component={SingleCharacterLayout} dataType='character' />} />
                            <Route path='*' element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;