import React, { useState } from 'react';
import axios from 'axios';


const EvacInfoPopup = ({anchoredmarker})=> {
  return(
    <div>
      <p>Evac center Information</p>
            <p>Evac_id: {anchoredmarker.idEvacuationCenter}</p>
              <p>Latitude: {anchoredmarker.lat}</p>
              <p>Longitude: {anchoredmarker.lng}</p>
              <button>Submit</button>
    </div>
    )
}
export default EvacInfoPopup; 