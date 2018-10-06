import React from 'react';
import { Route, Link } from 'react-router-dom';

import styles from './Header.css';

const Header = (props) => {
  console.log('props - ', props);
  return (
    <nav className='navbar navbar-expand  navbar-light bg-light'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <a className='navbar-brand'>Playkot</a>
        </div>
        <Route exact
          path='/auth'
          render={() => {
            return (props.isAuthenticated
              ? 
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                    <Link to='/users' className="nav-item nav-link">Users</Link>
                  </li>
                </ul>
                <span className="navbar-text">
                  {props.user.email}
                </span>
              </div>
              : null);
          }
          }/>
        <Route exact
          path='/users'
          render={() => {
            return (props.isAuthenticated
              ? <div className='d-flex flex-column flex-sm-row'>
                <span className="navbar-text">
                  {props.user.email}
                </span>
                <Link to='/auth' className="btn btn-primary ml-3">Logout</Link>
              </div>
              : null);
          }}
        />
      </div>
    </nav>
  );
};

export default Header;
