import React from 'react';
import { Route, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const Header = props => (
  <nav className='navbar navbar-expand  navbar-light bg-light'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <a className='navbar-brand'>Playkot</a>
      </div>
      <Route exact
        path='/auth'
        render={() => (props.isAuthenticated
          ? <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to='/users' className="nav-item nav-link">Users</Link>
              </li>
            </ul>
            <span className="navbar-text">
              {props.user.email}
            </span>
          </div>
          : null)
        }/>
      <Route
        path='/users'
        render={() => (props.isAuthenticated
          ? <div className='d-flex flex-column flex-sm-row'>
            <span className="navbar-text">
              {props.user.email}
            </span>
            <Link to='/auth' className="btn btn-primary ml-3">Logout</Link>
          </div>
          : null)
        }
      />
    </div>
  </nav>
);

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.string),
};

export default Header;
