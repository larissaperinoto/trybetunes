import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music, handleChange, checked, key } = this.props;
    return (
      <li key={ key }>
        <div>
          <h4>{ music.trackName }</h4>
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
              id="checkbox-music"
              type="checkbox"
              onChange={ (event) => handleChange(music, event) }
              checked={ checked }
            />
            Favorita
          </label>
        </div>
      </li>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  key: PropTypes.number.isRequired,
};

export default MusicCard;
