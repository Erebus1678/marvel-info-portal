import { Component } from 'react';
import Spiner from '../Spinner/Spinner'
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        erorr: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onErorr = () => {
        this.setState({
            loading: false,
            erorr: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService
            .getCharactrer(id)
            .then(this.onCharLoaded)
            .catch(this.onErorr)
    }


    render() {
        const { char, loading, erorr } = this.state
        const errorMessage = erorr ? <ErrorMessage /> : undefined;
        const spinner = !loading ? undefined : <Spiner />;
        const content = !(loading || erorr) ? <View char={char} /> : undefined;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }

}
const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char
    const unAviable = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    return (
        <div className="randomchar__block">
            <img src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={thumbnail === unAviable ? { objectFit: 'contain' } : {}}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;