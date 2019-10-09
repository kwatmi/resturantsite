import React from 'react';
import  {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class Mapsec extends React.Component{

    render(){
return(
     <Map
      places={this.props.places}
      initialCenter={{lat: this.props.pos.lat, lng:this.props.pos.lng+0.00035}} 
      google={this.props.google} 
      zoom={19} 
      streetViewControl = {false}
      zoomControl= {false}
      fullscreenControl= {false}
      mapTypeControl = {false}
      onClick={this.getCenter}
      onDragend={this.searchAgain}
      onReady={this.initiateMap}
    >

    <Marker 
    onClick={this.props.handleMap}
    onMouseover={this.showInfoWindow} 
    onMouseout={this.hideInfoWindow}
    name={'you are here'}
    animation = {google.maps.Animation.DROP}
    position= {this.props.pos}
    icon={'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'}
   />  

  </Map>
);

}
}

export default Mapsec;