import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardAlbum extends Component {
  render() {
    const { data, saveSearch } = this.props;

    return (
      <div>
        {`Resultado de álbuns de: ${saveSearch}`}
        {
          data.map((album) => (
            <div key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt="Capa do Album" />
              <h2>{ album.collectionName }</h2>
              <h3>{ album.artistName }</h3>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Saiba mais
              </Link>
            </div>))
        }
      </div>
    );
  }
}

CardAlbum.propTypes = {
  saveSearch: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardAlbum;
