import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import keys from '../../googleKeys.json';
import styles from './Auth.css';

class Auth extends React.PureComponent {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: '' };
  }

  logout = () => {
    this.setState({
      isAuthenticated: false,
      token: '',
      user: null,
    });
  };

  googleResponse = (response) => {
    console.log(response.accessToken);
    this.setState({
      isAuthenticated: true,
      user: response.profileObj,
    });
  };

  onFailure = (error) => {
    console.error(error);
  }

  render() {
    console.log('Auth');
    const content = this.state.isAuthenticated
      ? (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <GoogleLogout
              buttonText="Logout"
              onLogoutSuccess={this.logout}
            >
            </GoogleLogout>
          </div>
        </div>
      )
      : (
        <div>
          <GoogleLogin
            clientId={keys.client_id}
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </div>
      );

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Auth;
