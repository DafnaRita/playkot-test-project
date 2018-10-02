import React from 'react';
import { Route } from 'react-router-dom';

import styles from './User.css';

const User = () => (
  <Route exact path="/user">
    <div>
      user
    </div>
  </Route>
);

export default User;
