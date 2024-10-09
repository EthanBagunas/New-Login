import React, { useState } from 'react';
import {InfoWindow } from 'google-maps-react';
import axios from 'axios';


const EvacInfoPopup = (anchoredmarker)=> {
    <div>
            <p>Evac_id: {anchoredmarker.idEvacuationCenter}</p>
              <p>Latitude: {anchoredmarker.lat}</p>
              <p>Longitude: {anchoredmarker.lng}</p>
              <button>Submit</button>
    </div>
}
export default EvacInfoPopup; 