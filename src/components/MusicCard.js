import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, handleFavoriteSong } = this.props;

    return (
      <li>
        <div>
          { music.trackName }
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
          <label
            htmlFor="checkbox-music"
          >
            <input
              data-testid={ `checkbox-music-${music.trackId}` }
              name="checkbox-music"
              type="checkbox"
              onChange={ handleFavoriteSong }
            />
            Favorita
          </label>
        </div>
      </li>
    );
  }
}

MusicCard.propTypes = {
  handleFavoriteSong: PropTypes.func.isRequired,
  music: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MusicCard;
