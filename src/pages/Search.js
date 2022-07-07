import React, { Component } from 'react';
import CardAlbum from '../components/CardAlbum';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      isLoading: false,
      clean: false,
      data: [],
      search: '',
      saveSearch: '',
    };
  }

  verifyInput = () => {
    const { search } = this.state;
    const validate = 1;
    if (search.length > validate) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ search: value }, () => this.verifyInput());
  }

  buttonClick = () => {
    const { search } = this.state;
    this.setState({ isLoading: true, saveSearch: search }, async () => {
      const data = await searchAlbumsAPI(search);
      this.setState({ isLoading: false, search: '', data });
    });
  }

  render() {
    const { isDisabled, search, data, isLoading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <label htmlFor="search-artist-input">
            <input
              type="text"
              id="search-artist-input"
              name="search-artist-input"
              value={ search }
              data-testid="search-artist-input"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ this.buttonClick }
          >
            Pesquisar
          </button>
        </div>

        <div>
          { isLoading && <Loading /> }

          { data.length > 0
            ? <CardAlbum { ...this.state } />
            : <p>Nenhum álbum foi encontrado</p> }

        </div>
      </div>
    );
  }
}

export default Search;
