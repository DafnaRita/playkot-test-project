import React from 'react';
import { Route, Link } from 'react-router-dom';

import styles from './Users.css';

const Users = (props) => {
  const { isAuthenticated } = props;
  console.log('isAuthenticated - ', isAuthenticated);
  const content = (
    isAuthenticated ? (
      <div>
        Users(Authenticated)
        <Link to='/auth'>Link</Link>
      </div>
    ) : (
      <div>
        Please,
        <Link to='/auth'>Authenticate</Link>
      </div>)
  );
  return (
    <div>
      { content }
    </div>
  );
};

export default Users;
