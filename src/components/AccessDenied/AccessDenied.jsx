import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AccessDenied.css';

const AccessDenied = (props) => {
  return (
    <div>
      {props.message}
      <Link to='/auth'>{props.linkLabel}</Link>
    </div>
  );
};

export default AccessDenied;
