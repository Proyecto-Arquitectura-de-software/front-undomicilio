import React from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap
 } from 'react-google-maps';

const Mapa = (props)=>{
  return (
    <GoogleMap defaultZoom={17} defaultCenter={{ lat: 4.638579, lng: -74.083735 }} />    
  );
}

export default withScriptjs(
  withGoogleMap(
    Mapa
  )
)
