import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Route, Link } from 'react-router-dom';

import googleKey from '../../googleKey.json';
import styles from './Auth.css';

const onFailure = (error) => {
  console.error(error);
};

const Auth = (props) => {
  console.log('Auth start');
  console.log('props.isAuthenticated - ', props.isAuthenticated);
  return props.isAuthenticated ? (
    <div>
      <p>Authenticated</p>
      <div>
        <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={props.logout}>
        </GoogleLogout>
        <Link to='/users'>Link</Link>
      </div>
    </div>
  )
    : (
      <div>
        <p>Please, login</p>
        <GoogleLogin
          clientId={googleKey.client_id}
          buttonText="Login"
          onSuccess={props.login}
          onFailure={onFailure}
        />
      </div>
    );
};

export default Auth;
