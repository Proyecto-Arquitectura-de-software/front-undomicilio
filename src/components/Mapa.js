import React, { Component } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap
 } from 'react-google-maps';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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

/*<Mapa
  googleMapURL={mapaURL}
  containerElement={<div style={{height: '410px'}} />}
  mapElement={<div style={{height: '100%' }} />}
  loadingElement={<p>Cargando</p>}
/>*/

//const mapaURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credenciales.mapsKey}`

/*export class Mapa extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
            lat: 4.638579,
            lng: -74.083735
          }}
        zoom={17}>

        <Marker onClick={this.onMarkerClick}
                name={'Ubicacion actual'} />

        <InfoWindow onClose={this.onInfoWindowClose}>

        </InfoWindow>
      </Map>
    );
  }
}

const style = {
  width: '50%',
  height: '50%'
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD8fC65nbT6aejkCyRUgbA7y2j_oqStVEM")
})(Mapa)*/
