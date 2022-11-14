class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=92d3a9e4b6a08ae4fe092d4d8000ddc1';

    getResurce = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharactrers = async () => {
        const res = await this.getResurce(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._tranformCharacter);
    }
    getCharactrer = async (id) => {
        const res = await this.getResurce(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._tranformCharacter(res.data.results[0])
    }

    _tranformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;