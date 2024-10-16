import React, { useContext, useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';
import LevelButtons from './levelButtons';
import normalIcon from './icons/gps.png';
import lowIcon from './icons/gps(1).png';
import mediumIcon from './icons/gps(2).png';
import highIcon from './icons/gps(3).png';
import extremeIcon from './icons/gps(4).png';
import useAuth from '../../hooks/useAuth';
import Navbar from '../Navbar';
import { Button } from '@mui/material';
import Dashboard from '../Dashboard/Dashboard';

// evacuation feat
// evacuation feat
import EvacInfoPopup from '../EvacuationInfo/ShowEvacInfo';
import FamInsert from '../EvacuationInfo/FamInsert';

export const MarkerContext = React.createContext();
export const LevelContext = React.createContext();

const markerIcons = {
  Normal: normalIcon,
  Low: lowIcon,
  Medium: mediumIcon,
  High: highIcon,
  Extreme: extremeIcon
};

const mapStyles = {
  width: '95%',
  height: '80%',
  margin: '20px auto'
};

const initposition = {
  lat: 10.310530313219541,
  lng: 123.89366616608562
};

export const MapContainer = (props) => {
  
  const evac_url= 'https://api.iconify.design/healthicons:emergency-post.svg?color=%23ff3300'
  
  const { auth = { roles: [] } } = useAuth(); // Get user roles from auth
  const [markers, setMarkers] = useState([]);
  const [poptext, setPoptext] = useState('');
  
  //! cant instant update selectedevacmarker when new occupant
  const [selectedevacMarker, setSelectedevacMarker] = useState(null); 
  const onEvacMarkerClick = (value) => {
    setSelectedevacMarker(value);
  };

  const [addocc, setAddOcc]= useState(false)
  function handleAddOcc(value){
    setAddOcc(value)
  }
  
  const [evacmarkers, SetEvacMarkers]= useState([]);
  const handleEvacMarkers=() => {
    if (evacmarkers.length === 0){
      axios.get('http://localhost:7000/evacmarker/all')
      .then(response => {
        SetEvacMarkers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    } else{
      SetEvacMarkers([]);
    }
  }
  

  const [lattitude, SetLattitude]=useState();
  const [longitude, SetLongitude]=useState();
  const handlePosition =(position) => {
    SetLattitude(position.lat());
    SetLongitude(position.lng());
  }

  const hasRole1994 = auth.roles.includes('1994');
  return (
      <div>
        <Navbar/> 
          <Map style={mapStyles}
          google={props.google}
          zoom={14}
          initialCenter={initposition}
          onClick={(mapProps, map, clickEvent) => {
            handlePosition(clickEvent.latLng)
          }}>   
          <LevelContext.Provider value= {{poptext, setPoptext}}>
              <MarkerContext.Provider value= {{markers, setMarkers}}>
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
            {selectedevacMarker && ( 
              <InfoWindow
              visible={evacmarkers.length === 0  ? false : true}
              position={{ lat: selectedevacMarker.lat, lng: selectedevacMarker.lng }}
              onCloseClick={() => setSelectedevacMarker(null)}
              onOpen={() => {
                const button = document.querySelector('#button');
                if (button) {
                  button.addEventListener('click', () => handleAddOcc(true));
                }}}>
                <EvacInfoPopup anchoredmarker={selectedevacMarker}/>
              </InfoWindow>
            )}
            {selectedevacMarker && <FamInsert open={addocc} onClose={() => handleAddOcc(false)} occlocation= {selectedevacMarker.LOCATION} setEvac={SetEvacMarkers} closeSelectedevacmarker={()=> setSelectedevacMarker(null)}/> }

            {evacmarkers.map((evacmarker, index) => (
              <Marker key={index} position={{ lat: evacmarker.lat, lng: evacmarker.lng }}
              icon= {{
                url: evac_url,
                scaledSize: new window.google.maps.Size(50, 50)
              }}
              onClick={() => onEvacMarkerClick(evacmarker)}
              />
            ))}



            {hasRole1994 && <Dashboard lat={lattitude} lng= {longitude} setLat={SetLattitude} setLng={SetLongitude}  showEvac={handleEvacMarkers} />}

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
