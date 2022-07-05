import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      listFavoriteSongs: [],
    };
  }

  componentDidMount() {
    this.importFavoritesSongs();
  }

  importFavoritesSongs = async () => {
    this.setState({ isLoading: true });
    const listFavoriteSongs = await getFavoriteSongs();
    this.setState({ isLoading: false, listFavoriteSongs });
  }

  render() {
    const { isLoading, listFavoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <ul>
          <li>
            { isLoading && <Loading /> }
            {
              listFavoriteSongs.map((song) => (<MusicCard
                music={ song }
                key={ song.trackId }
              />))
            }
          </li>
        </ul>
      </div>
    );
  }
}

export default Favorites;
