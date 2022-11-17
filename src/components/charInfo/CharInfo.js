import { Component } from 'react';
import Spiner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        erorr: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }

    }


    updateChar = () => {
        const { charId } = this.props;
        if (!charId) { return }
        this.onCharLoading()

        this.marvelService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onErorr)
    }

    onErorr = () => {
        this.setState({
            loading: false,
            erorr: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }
    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }
    render() {
        const { char, loading, erorr } = this.state;
        const skeleton = char || loading || erorr ? null : <Skeleton />;
        const errorMessage = erorr ? <ErrorMessage /> : undefined;
        const spinner = !loading ? undefined : <Spiner />;
        const content = !(loading || erorr || !char) ? <View char={char} /> : undefined;


        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
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

export default CharInfo;