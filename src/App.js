import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    latitude: '',
    longitude: ''
  }
  
  success = pos => {
    const crd = pos.coords;
    this.setState({latitude: crd.latitude});
    this.setState({longitude: crd.longitude});
  }

  error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  getCoords = () => {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
  }

  
  render() {
    return (
      <div className="App">
        <button onClick={this.getCoords}>Get my coordinates</button>
        <div>
          <p> Your current latitude is:
            {this.state.latitude} <br/>
            Your current  longitude is:
            {this.state.longitude} <br />
            <div id="map"></div>
            <script>
              var map;
              function initMap() {
                map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: {this.state.latitude}, lng: 150.644},
                  zoom: 8
                })
              }
            </script>
            <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
            async defer></script>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
