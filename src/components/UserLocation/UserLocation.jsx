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
      <Marker lat={props.location[0]} lon={props.location[1]} />
    </Map>
  );
};

export default UserLocation;
