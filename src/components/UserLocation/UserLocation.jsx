import React from 'react';
import { Map, Marker } from 'yandex-map-react';

import PropTypes from 'prop-types';

const UserLocation = (props) => (
  <Map
    center={props.location}
    zoom={4}
    width='100%'
    height='200px'>
    <Marker lat={parseInt(props.location[0], 10)} lon={parseInt(props.location[1], 10)} />
  </Map>
);

UserLocation.propTypes = {
  location: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UserLocation;
