import React, { Component } from 'react';
import CardAlbum from '../components/CardAlbum';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      habilityButton: true,
      isLoading: false,
      clean: false,
      data: [],
    };
  }

  handleButtonSearch = ({ target: { value } }) => {
    const valueMin = 1;
    if (value.length > valueMin) {
      this.setState({ habilityButton: false, search: value });
    } else {
      this.setState({ habilityButton: true });
    }
  }

  handleClick = async () => {
    const { search } = this.state;
    this.setState({ isLoading: true, clear: true });
    const data = await searchAlbumsAPI(search);
    this.setState({ isLoading: false, data });
  }

  render() {
    const { habilityButton, search, data, isLoading, clear } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              name="search-artist-input"
              value={ clear ? '' : search }
              data-testid="search-artist-input"
              onChange={ this.handleButtonSearch }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ habilityButton }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>

        <div>
          { isLoading && <Loading /> }

          { (data.length > 0 && search !== '')
            ? <CardAlbum { ...this.state } />
            : <p>Nenhum álbum foi encontrado</p> }

        </div>
      </div>
    );
  }
}

export default Search;
