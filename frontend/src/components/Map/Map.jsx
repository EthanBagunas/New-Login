import React, { useContext, useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
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

//device feat
import DevicePopup from '../DevInfo/DevPopup';
import {DevModal} from '../BaseMUI/ModalView'
// evacuation feat
import EvacInfoPopup from '../EvacuationInfo/EvacPopup';
import InsertEvacModal from '../EvacuationInfo/EvacInsertModal';
import FamModal from '../EvacuationInfo/FamModal';



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
  const axiosPrivate = useAxiosPrivate();
  const evac_url= 'https://api.iconify.design/healthicons:emergency-post.svg?color=%23ff3300'
  const { auth = { roles: [] } } = useAuth(); // Get user roles from auth
  const [poptext, setPoptext] = useState('');
  
  const [lattitude, SetLattitude]=useState();
  const [longitude, SetLongitude]=useState();
  const handlePosition =(position) => {
    SetLattitude(position.lat());
    SetLongitude(position.lng());
  }


  const [showModal, setShowModal]= useState('')
  function handleModal(value){
    setShowModal(value)
  }

  const [evacmarkers, SetEvacMarkers]= useState([]);
  const handleEvacMarkers=() => {
    if (evacmarkers.length === 0){
      axiosPrivate.get('/evacmarker/all')
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
  //! cant instant update selectedevacmarker when new occupant
  const [selectedevacMarker, setSelectedevacMarker] = useState(null); 
  const onEvacMarkerClick = (value) => {
    setSelectedevacMarker(value);
  };

  const [devmarkers, setDevMarkers] = useState([]);
  const [selectedDevmarker, setSelectedDevmarker] = useState(null); 
  const onDevMarkerClick = (value) => {
    setSelectedDevmarker(value);
  };
  
  

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
              <MarkerContext.Provider value= {{devmarkers, setDevMarkers}}>
                <LevelButtons />
              </MarkerContext.Provider>
            </LevelContext.Provider>

            {devmarkers.map((marker, index) => (
              <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: markerIcons[poptext],
                scaledSize: new window.google.maps.Size(30, 30)
              }}
              onClick={() => onDevMarkerClick(marker)}
              />
            ))}

            {selectedDevmarker && ( 
              <InfoWindow
              visible={true}
              position={{ lat: selectedDevmarker.lat, lng: selectedDevmarker.lng }}
              onCloseClick={() => setSelectedDevmarker(null)}
              onOpen={() => {
                const devbutton = document.getElementById('devbutton');
                if (devbutton) {
                  devbutton.addEventListener('click', () => handleModal('dev'));
                }}}
              >
                <DevicePopup selected={selectedDevmarker.DEVICE_NAME}/>
              </InfoWindow>
            )}
            
            {selectedDevmarker && <DevModal open={ showModal=== 'dev' ? true: false} onClose={() => handleModal(null)} devicename={selectedDevmarker.DEVICE_NAME}/> }

            {selectedevacMarker && <InsertEvacModal open={showModal === 'evac' ? true : false} onClose={() => handleModal(null)} location= {selectedevacMarker.LOCATION} setEvac={SetEvacMarkers} closeSelectedevacmarker={()=> setSelectedevacMarker(null)}/> }
            
            <FamModal open={showModal === 'fam' ? true: false} onClose={()=>handleModal(null)} /> 
            

            {evacmarkers.map((evacmarker, index) => (
              <Marker key={index} position={{ lat: evacmarker.lat, lng: evacmarker.lng }}
              icon= {{
                url: evac_url,
                scaledSize: new window.google.maps.Size(50, 50)
              }}
              onClick={() => onEvacMarkerClick(evacmarker)}
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
                  button.addEventListener('click', () => handleModal('evac'));
                }}}>
                <EvacInfoPopup anchoredmarker={selectedevacMarker}/>
              </InfoWindow>
            )}          
      
            {hasRole1994 && <Dashboard lat={lattitude} lng= {longitude} setLat={SetLattitude} setLng={SetLongitude}  showEvac={handleEvacMarkers} famModal={() => handleModal('fam')}/>}

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
