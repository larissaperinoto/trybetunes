import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      infos: {},
    };
  }

  componentDidMount() {
    this.handleApi();
  }

  handleApi = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const infos = musics[0];
    this.setState({ musics, infos });
  }

  render() {
    const { infos, musics } = this.state;
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
          {
            musics.filter((obj) => obj !== infos)
              .map((music) => (
                <MusicCard
                  music={ music }
                  key={ music.trackId }
                />))
          }
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Album;
