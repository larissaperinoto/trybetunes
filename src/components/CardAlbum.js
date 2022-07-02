import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardAlbum extends React.Component {
  render() {
    const { data, search } = this.props;

    return (
      <div>
        {`Resultado de álbuns de: ${search}`}
        {
          data.map((album, index) => (
            <div key={ index }>
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
  search: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardAlbum;
