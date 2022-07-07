import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import * as userAPI from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      name: '',
    };
  }

  componentDidMount = async () => {
    const { getUser } = userAPI;
    this.setState({ isLoading: true });
    const { name } = await getUser();
    this.setState({ isLoading: false, name });
  }

  render() {
    const { isLoading, name } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? <Loading /> : <p data-testid="header-user-name">{ name }</p> }
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
