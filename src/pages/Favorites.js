import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      listFavoriteSongs: [],
    };
  }

  componentDidMount() {
    this.reloadFavoritesSongs();
  }

  reloadFavoritesSongs = async () => {
    const listFavoriteSongs = await getFavoriteSongs();
    this.setState({ isLoading: false, listFavoriteSongs });
  }

  changeFavoriteSong = async (music) => {
    this.setState({ isLoading: true });
    await removeSong(music);
    this.reloadFavoritesSongs();
  }

  render() {
    const { isLoading, listFavoriteSongs } = this.state;
    const checked = true;
    return (
      <div data-testid="page-favorites">
        <Header />
        <ul>
          { isLoading ? <Loading /> : (listFavoriteSongs.map((music) => (
            <MusicCard
              music={ music }
              key={ music.trackId }
              handleChange={ this.changeFavoriteSong }
              checked={ checked }
            />))) }
        </ul>
      </div>
    );
  }
}

export default Favorites;
