import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      infos: {},
      isLoading: false,
      listFavoriteSongs: [],
    };
  }

  componentDidMount() {
    this.albumApi();
    this.reloadFavoriteSongs();
  }

  albumApi = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const infos = musics[0];
    this.setState({ musics, infos });
  }

  changeFavoriteSong = async (music, { target }) => {
    this.setState({ isLoading: true });
    const { checked } = target;
    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    await this.reloadFavoriteSongs();
    this.setState({ isLoading: false });
  }

  reloadFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const listFavoriteSongs = await getFavoriteSongs();
    this.setState({ isLoading: false, listFavoriteSongs });
  }

  checkedFavoriteSongs = (music) => {
    const { listFavoriteSongs } = this.state;
    return listFavoriteSongs.some((song) => song.trackId === music.trackId);
  }

  render() {
    const { infos, musics, isLoading } = this.state;
    const { artistName, collectionName, artworkUrl100 } = infos;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img src={ artworkUrl100 } alt="Capa do Album" />
          <h2 data-testid="artist-name">{ artistName }</h2>
          <h3 data-testid="album-name">{ collectionName }</h3>
        </div>
        <ul>
          { isLoading && <Loading /> }
          { (musics.filter((obj) => obj !== infos)
            .map((music) => (
              <MusicCard
                music={ music }
                key={ music.trackId }
                handleChange={ this.changeFavoriteSong }
                checked={ this.checkedFavoriteSongs(music) }
              />))) }
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Album;
