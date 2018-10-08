import React from 'react';

import UserLocation from '../UserLocation';

import styles from './PersonalPage.css';

const PersonalPage = (props) => {
  console.log('props - ', props.location.state);
  const user = props.location.state;
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4 d-none d-sm-block">
        content
        </div>
        <div className="col-sm-8">
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
