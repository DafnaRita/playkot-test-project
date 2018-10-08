import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import PropTypes from 'prop-types';

import googleKey from '../../googleKey.json';

const onFailure = (error) => {
  console.error(error);
};

const Auth = (props) => {
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

Auth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default Auth;
