import React from 'react';
import Loading from '../pages/Loading';
import * as userAPI from '../services/userAPI';

class Header extends React.Component {
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
      </header>
    );
  }
}

export default Header;
