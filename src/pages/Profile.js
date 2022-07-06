import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.importUserData();
  }

  importUserData = async () => {
    const userData = await getUser();
    this.setState({ isLoading: false, userData });
  }

  render() {
    const { isLoading, userData: { name, description, image, email } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <Link to="/profile/edit">Editar perfil</Link>
            <h3>{ name }</h3>
            <img src={ image } alt={ `User ${name}` } data-testid="profile-image" />
            <p>{ email }</p>
            <p>{ description }</p>
          </div>) }
      </div>
    );
  }
}

export default Profile;
