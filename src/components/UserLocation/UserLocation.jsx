import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, MarkerLayout } from 'yandex-map-react';

const UserLocation = (props) => {

  return (
    <Map
      onAPIAvailable={function () { console.log('API loaded'); }}
      center={props.location}
      zoom={4}
      width='100%'
      height='200px'>
      <Marker lat={parseInt(props.location[0], 10)} lon={parseInt(props.location[1], 10)} />
    </Map>
  );
};

export default UserLocation;
