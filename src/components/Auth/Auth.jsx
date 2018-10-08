import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import googleKey from '../../googleKey.json';
import styles from './Auth.css';

const onFailure = (error) => {
  console.error(error);
};

const Auth = (props) => {
  console.log('Auth - ', props);
  const button = props.isAuthenticated ? (
    <div className='container mx-auto text-center pt-4'>
      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={props.logout}
        onFailure={onFailure}
      />
    </div>
  )
    : (
      <div className='container mx-auto text-center pt-4'>
        <p>Please, log in</p>
        <GoogleLogin
          clientId={googleKey.client_id}
          buttonText="Login"
          onSuccess={props.login}
          onFailure={onFailure}
        />
      </div>
    );

  return (
    <div>
      {button}
    </div>
  );
};

export default Auth;
