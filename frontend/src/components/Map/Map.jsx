import React, { useContext, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import LevelButtons from './levelButtons';
import normalIcon from './icons/gps.png';
import lowIcon from './icons/gps(1).png';
import mediumIcon from './icons/gps(2).png';
import highIcon from './icons/gps(3).png';
import extremeIcon from './icons/gps(4).png';
import useAuth from '../../hooks/useAuth';
import Navbar from '../Navbar';


import Dashboard from '../Dashboard/Dashboard';


export const MarkerContext = React.createContext();
export const LevelContext = React.createContext();
export const LogsDataContext = React.createContext();

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
  const { auth = { roles: [] } } = useAuth(); // Get user roles from auth
  const [markers, setMarkers] = useState([]);
  const [poptext, setPoptext] = useState('');
  const [lattitude, SetLattitude]=useState();
  const [longitude, SetLongitude]=useState();
  
  const [logsdata, SetLogsData]= useState('');

  const handlePosition =(position) => {
    SetLattitude(position.lat());
    SetLongitude(position.lng());
    console.log(lattitude, " ", longitude)
  }

  const hasRole1994 = auth.roles.includes('1994');

    return (
      <div>
        <Navbar/> 
      
        {hasRole1994 &&<Dashboard lat={lattitude} lng= {longitude} setLat={SetLattitude} setLng={SetLongitude}/>}
      <Map style={mapStyles}
      google={props.google}
      zoom={14}
      initialCenter={initposition}
      onClick={(mapProps, map, clickEvent) => {
        handlePosition(clickEvent.latLng)
      }}>   
        <LevelContext.Provider value= {[poptext, setPoptext]}>
            <MarkerContext.Provider value= {[markers, setMarkers]}>
              <LogsDataContext.Provider value={[logsdata, SetLogsData]}>
               <LevelButtons />
              </LogsDataContext.Provider>
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
        </Map>
        </div>
    );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBP4935sgIDwKy6UFmDSchMGBv9zesXlvQ'
})(MapContainer);
