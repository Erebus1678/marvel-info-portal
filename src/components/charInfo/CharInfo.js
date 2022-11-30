import { useEffect, useState } from 'react';
import Spiner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';
import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)


    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar()
    }, [])
    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;
        if (!charId) { return }
        onCharLoading()

        marvelService.getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onError = () => {
        setLoading(false);
        setError(true)
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true)
    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : undefined;
    const spinner = !loading ? undefined : <Spiner />;
    const content = !(loading || error || !char) ? <View char={char} /> : undefined;


    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}


const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char
    const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}
                    style={thumbnail === imgNotFound ? { objectFit: 'contain' } : {}}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">{comics.length === 0 ? null : 'Comics:'}</div>
            <ul className="char__comics-list">
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line array-callback-return
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;