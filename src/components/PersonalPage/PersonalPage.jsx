import React from 'react';
import { Redirect } from 'react-router-dom';

import UserLocation from '../UserLocation';
import ImageLoader from '../ImageLoader';
import Description from '../Description';

import PropTypes from 'prop-types';

import sessionDataSaver from '../../app/hocs/sessionDataSaverHoc';

const PersonalPage = (props) => {
  const user = props.location.state;
  if (!props.isAuthenticated) {
    return (
      <div className='container'>
        <Redirect to='/auth'/>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-md-4 d-none d-sm-block">
          <ImageLoader {...props}/>
        </div>
        <div className="col-sm-6 col-md-8">
          <blockquote>
            <h4>{user.firstName} {user.lastName}</h4>
            <i className="icon-map-marker"></i>
          </blockquote>
          <p>
            {user.email}
          </p>
          <div>
            <h6>Description:</h6>
            <Description {...props}/>
          </div>
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="col-sm-12 mx-auto">
          <h5>Geolocation:</h5>
          <UserLocation
            location={user.location}
          />
        </div>
      </div>
    </div>
  );
};

PersonalPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    state:  PropTypes.shape({
      user: PropTypes.shape({
        location: PropTypes.arrayOf(PropTypes.string),
        lastName: PropTypes.string,
        firstName: PropTypes.string,
        email: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default sessionDataSaver(PersonalPage);
