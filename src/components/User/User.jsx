import React from 'react';

import styles from './User.css';

class User extends React.PureComponent {
  render() {
    console.log('User');
    return (
      <div>
        User number - {this.props.match.params.number}
      </div>
    );
  }
}

export default User;
