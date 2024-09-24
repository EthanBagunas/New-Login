import React, { Component, useContext,useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import LevelButtons  from './levelButtons';
import normalIcon from './icons/gps.png';
import lowIcon from './icons/gps(1).png';
import mediumIcon from './icons/gps(2).png';
import highIcon from './icons/gps(3).png';
import extremeIcon from './icons/gps(4).png';
import Test from '../Dashboard/AddDevices';
import Navbar from '../Navbar';
import Dashboard from '../Dashboard/Dashboard';


export const MarkerContext = React.createContext();
export const LevelContext = React.createContext();

const markerIcons = {
  Normal: normalIcon, // Green
  Low: lowIcon, // Yellow
  Medium: mediumIcon, // Orange
  High: highIcon, // Red
  Extreme: extremeIcon // Purple
};

const mapStyles = {
  width: '95%',
  height: '80%',  
  margin: '20px auto'
};

const initposition = {    
  lat:10.310530313219541, 
  lng:123.89366616608562
}


export const MapContainer = (props) => {
  const [markers, setMarkers] = useState([]);
  const [poptext, setPoptext] = useState('');
  const [lattitude, SetLattitude]=useState();
  const [longitude, SetLongitude]=useState();
  
  const handlePosition =(position) => {
    SetLattitude(position.lat());
    SetLongitude(position.lng());
    console.log(lattitude, " ", longitude)
  }
    return (
      <div>
      <Navbar/> 
      <Dashboard lat={lattitude} lng= {longitude} setLat={SetLattitude} setLng={SetLongitude}/>
        <Map style={mapStyles}
        google={props.google}
        zoom={14}
        initialCenter={initposition}
        onClick={(mapProps, map, clickEvent) => {
          handlePosition(clickEvent.latLng)
        }}>   
            <LevelContext.Provider value= {[poptext, setPoptext]}>
                <MarkerContext.Provider value= {[markers, setMarkers]}>
                  <LevelButtons />
                </MarkerContext.Provider>
            </LevelContext.Provider>
            
            {markers.map((marker, index) => (
              <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: markerIcons[poptext],
                scaledSize: new window.google.maps.Size(30, 30)
              }}
              />
            ))}
              
            <Marker
              position={{ lat: lattitude, lng: longitude }}
              icon={{
                url: markerIcons['High'],
                scaledSize: new window.google.maps.Size(30, 30)
              }}/>
        </Map>
      </div>
    );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBP4935sgIDwKy6UFmDSchMGBv9zesXlvQ'
})(MapContainer);