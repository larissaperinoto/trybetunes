import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
    };
  }

  componentDidMount() {
    this.handleCheckedFavoriteSongs();
  }

  handleCheckedFavoriteSongs = () => {
    const { listFavoriteSongs, music } = this.props;
    const checked = listFavoriteSongs.some((song) => song.trackId === music.trackId);
    this.setState({ checked });
  }

  handleChange = (music) => {
    const { handleFavoriteSong } = this.props;
    this.setState(({ checked: true }), () => handleFavoriteSong(music));
  }

  render() {
    const { music } = this.props;
    const { checked } = this.state;
    return (
      <li>
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
              type="checkbox"
              onChange={ () => this.handleChange(music) }
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
  handleFavoriteSong: PropTypes.func.isRequired,
  music: PropTypes.arrayOf(PropTypes.string).isRequired,
  listFavoriteSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
