import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      habilityButton: true,
    };
  }

  handleButtonSearch = ({ target: { value } }) => {
    const valueMin = 1;
    if (value.length > valueMin) {
      this.setState({ habilityButton: false });
    } else {
      this.setState({ habilityButton: true });
    }
  }

  render() {
    const { habilityButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist-input">
          <input
            type="text"
            name="search-artist-input"
            data-testid="search-artist-input"
            onChange={ this.handleButtonSearch }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ habilityButton }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
