import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EvacInfoPopup = (anchoredmarker)=> {


  const [evac_info, setEvac_Info] = useState({}) 


  useEffect(() => { 
    axios.get(`http://localhost:7000/evacmarker/${anchoredmarker.idEvacuationCenter}`)
      .then(response => {
        console.log(response.data);
        setEvac_Info(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [anchoredmarker])

  return(
    <div>
      <p>Evac center Information</p>
        <p>Evacuation Center: {evac_info.EvacName}</p>
        <p>Location: {evac_info.LOCATION}</p>
        <p>Status: {evac_info.status}</p>
        <p>Max Capacity: {evac_info.max_capacity}</p>
        <p>Current Capacity: {evac_info.current_capacity}</p>
        <button>Submit</button>
    </div>
    )
}
export default EvacInfoPopup; 