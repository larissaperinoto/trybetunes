import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      isLoading: false,
      listFavoriteSongs: [],
    };
  }

  componentDidMount() {
    this.handleReloadFavoriteSongs();
  }

  handleCheckedFavoriteSongs = () => {
    const { music } = this.props;
    const { listFavoriteSongs } = this.state;
    const checked = listFavoriteSongs.some((song) => song.trackId === music.trackId);
    this.setState({ checked });
  }

  handleFavoriteSong = async (music) => {
    this.setState({ isLoading: true });
    await addSong(music);
    this.setState({ isLoading: false });
    this.removeFavoriteSong(music);
  }

  handleChange = (music) => {
    const add = true;
    const remove = false;
    this.setState((prevState) => ({ checked: (prevState.checked) ? remove : add }),
      () => this.handleFavoriteSong(music));
  }

  handleReloadFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const listFavoriteSongs = await getFavoriteSongs();
    this.setState({ isLoading: false, listFavoriteSongs });
    this.handleCheckedFavoriteSongs();
  }

  removeFavoriteSong = async (music) => {
    const { trackId } = music;
    const { listFavoriteSongs } = this.state;
    const favorite = listFavoriteSongs.some((song) => song.trackId === trackId);
    if (favorite) await removeSong(music);
  }

  render() {
    const { music } = this.props;
    const { checked, isLoading } = this.state;
    return (
      <li>
        { isLoading && <Loading /> }
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
  music: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MusicCard;
