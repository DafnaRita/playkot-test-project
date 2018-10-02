import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Route } from 'react-router-dom';

import keys from '../../googleKeys.json';
import styles from './Auth.css';


const onFailure = (error) => {
  console.error(error);
}

const Auth = props => (
  props.isAuthenticated ? (
    <div>
      <p>Authenticated</p>
      <div>
        <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={props.logout}>
        </GoogleLogout>
      </div>
    </div>
  )
    : (
      <div>
        <p>Please, login</p>
        <GoogleLogin
          clientId={keys.client_id}
          buttonText="Login"
          onSuccess={props.login}
          onFailure={onFailure}
        />
      </div>
    )
);

export default Auth;
