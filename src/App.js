import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapWrapper from './components/MapWrapper'

function App() {
  return (
    <div className='appWrapper'>
       <div className='innerWrapper'>
         

        <MapWrapper 
        handleDetailRequest={this.handleDetailRequest}
        places={this.state.places}
        pos={this.state.pos} 
        handleRecentre={this.handleRecentre}
        handleDrag={this.handleDrag} 
        handlePlaces={this.handlePlaces}
        handleMarkers={this.handleMarkers}
        handleMap={this.handleMap}
        markers={this.state.markers}
        map={this.state.map}
        currentPlace={this.currentPlace}
        storedDetails={this.state.storedDetails}
        handleStoredDetails={this.handleStoredDetails}
       
        >
         
        </MapWrapper>
       </div>
     </div> 
  );
}

export default App;
