import React from 'react';
import { Redirect } from 'react-router-dom';

import UserLocation from '../UserLocation';
import ImageLoader from '../ImageLoader';

import styles from './PersonalPage.css';

const PersonalPage = (props) => {
  console.log('props - ', props.location.state);
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
          <ImageLoader/>
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
          </div>
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="col-sm-12 mx-auto">
          <h5>Geolocation:</h5>
          <UserLocation location={user.location} />
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
