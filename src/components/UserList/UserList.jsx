import React from 'react';
import { Route } from 'react-router-dom';

import styles from './UserList.css';

class UserList extends React.PureComponent {
  render() {
    console.log('UserList');
    return (
      <div>
        User List
      </div>
    );
  }
}

export default UserList;
