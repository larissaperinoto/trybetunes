import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isDisabled: true,
      name: '',
      email: '',
      image: '',
      description: '',
      changePage: false,
    };
  }

  componentDidMount() {
    this.importUserData();
  }

  importUserData = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({ isLoading: false, name, email, description, image },
      () => this.handleSubmit());
  }

  validateEmailRegex = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleSubmit = () => {
    const { name, email, description, image } = this.state;
    const verifyInput = [name, email, description, image].every((data) => data !== '');
    const verifyEmail = this.validateEmailRegex(email);
    if (verifyInput && verifyEmail) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value },
      () => this.handleSubmit());
  }

  handleClick = async () => {
    this.setState({ isLoading: true });
    const { name, email, image, description } = this.state;
    await updateUser({ name, email, image, description });
    this.setState({ isLoading: false, changePage: true });
  }

  render() {
    const { isLoading,
      isDisabled,
      name,
      description,
      image,
      email,
      changePage,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { changePage && <Redirect to="/profile" /> }
        {isLoading ? <Loading /> : (
          <div>

            <form>
              <label htmlFor="edit-input-name">
                Nome:
                <input
                  data-testid="edit-input-name"
                  name="name"
                  type="text"
                  id="edit-input-name"
                  value={ name }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>

              <label htmlFor="edit-input-email">
                E-mail:
                <input
                  data-testid="edit-input-email"
                  name="email"
                  type="email"
                  id="edit-input-email"
                  value={ email }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>

              <label htmlFor="edit-input-description">
                Descrição:
                <textarea
                  data-testid="edit-input-description"
                  name="description"
                  id="edit-input-description"
                  value={ description }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>

              <label htmlFor="edit-input-image">
                <input
                  data-testid="edit-input-image"
                  name="image"
                  id="edit-input-image"
                  value={ image }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>

              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ isDisabled }
                onClick={ (event) => this.handleClick(event) }
              >
                Salvar
              </button>
            </form>

          </div>
        )}

      </div>
    );
  }
}

export default ProfileEdit;
