import React,{ useState, useEffect} from 'react';
import axios from 'axios';


const EvacInfoPopup = ({anchoredmarker})=> {
  const [evacInfo, setEvacInfo] = useState(anchoredmarker);

  useEffect(() => {
    setEvacInfo(anchoredmarker);
  }, [anchoredmarker]);

  return(
    <div>
      <p>Evac center Information</p>
        <p>Evacuation Center: {evacInfo.EvacName}</p>
        <p>Location: {evacInfo.LOCATION}</p>
        <p>Status: {evacInfo.status}</p>
        <p>Max Capacity: {evacInfo.max_capacity}</p>
        <p>Current Capacity: {evacInfo.current_capacity}</p>
        <button>Submit</button>
    </div>
    )
}
export default EvacInfoPopup; 