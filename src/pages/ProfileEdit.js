import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      userData: {},
      isLoading: true,
      disable: true,
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
    const { isLoading, disable,
      userData: { name, description, image, email },
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading /> : (
          <from>
            <label htmlFor="edit-input-name">
              Nome:
              <input
                data-testid="edit-input-name"
                name="edit-input-name"
                type="text"
                value={ name }
              />
            </label>
            <label htmlFor="edit-input-email">
              E-mail:
              <input
                data-testid="edit-input-email"
                name="edit-input-email"
                type="email"
                value={ email }
              />
            </label>
            Descrição:
            <label htmlFor="edit-input-description">
              <textarea
                data-testid="edit-input-description"
                name="edit-input-description"
                value={ description }
              />
            </label>
            <label htmlFor="edit-input-image">
              <input
                data-testid="edit-input-image"
                name="edit-input-image"
                value={ image }
              />
            </label>
            <button
              data-testid="edit-button-save"
              type="button"
              disable={ disable }
            /* onClick = {} */
            >
              Salvar
            </button>
          </from>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
