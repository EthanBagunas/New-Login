import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { Box, Button, Modal, FormControl, FormLabel, Radio, RadioGroup, Typography} from '@mui/material';

import TextField from '@mui/material/TextField';
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { useTheme } from '@mui/system';


  const EvacInfoPopup = ({anchoredmarker})=> {
    const [evacInfo, setEvacInfo] = useState(anchoredmarker);
    return(
      <div>
          <p style={{fontWeight: 'bold'}}>EVACUATION CENTER INFORMATION</p>
          <p>Evacuation Center: {evacInfo.Evac_Name}</p>
          <p>Location: {evacInfo.LOCATION}</p>
          <p>Status: {evacInfo.status}</p>
          <p>Max Capacity: {evacInfo.max_capacity}</p>
          <p>Current Capacity: {evacInfo.current_capacity}</p>
          <Button id='button' >Add Occupants</Button>
          
      </div>
      )
    } 
  
  export default EvacInfoPopup; 
  


