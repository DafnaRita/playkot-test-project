import React from 'react';
import { Route, Link } from 'react-router-dom';

import styles from './Users.css';

const Users = (props) => {
  const { isAuthenticated } = props;
  console.log('isAuthenticated - ', isAuthenticated);
  return (
    isAuthenticated ? (<Route exact path="/users">
      <div>
        Users(Authenticated)
        <Link to='/auth'>Link</Link>
      </div>
    </Route>) : (<Route exact path="/users">
      <div>
        Please, Authenticated
        <Link to='/auth'>Link</Link>
      </div>
    </Route>)
  );
}


export default Users;
