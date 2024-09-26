import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Grid, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import { blue } from "@mui/material/colors";
import OtpTimer from 'otp-timer';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const Test = ({lat, lng}) => {
  const theme =useTheme();
  
  const [anchor, setAnchor] = React.useState(null);
  
    const handleAnchor = (event) => {
      setAnchor(anchor ? null : event.currentTarget);
    };
  
    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;

    const [formData, setFormData] = useState({
      deviceName: '',
      location: '',
      latitude: lat,
      longitude: lng,
    });

    useEffect(() => {
      setFormData({
        deviceName: formData.deviceName,
        location: formData.location,
        latitude: lat,
        longitude: lng,
        });
    },[lat, lng])
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post(`http://localhost:7000/setdevices`, formData)
        .then(response => {
          console.log(response.data);
          return { message: 'Successfully added device' };
        })
        .catch(error => {
          console.error(error);
          res.error('An error occurred. Please try again.');
        });
    };
  
    return (
      <div>
        <Button sx={{color: theme.palette.primary.main}} onClick={handleAnchor}>
          Add Device
        </Button>
        <BasePopup id={id} open={open} anchor={anchor}>
          <PopupBody> 
            <div>
              <input type="text" placeholder="Device Name" name="deviceName" onChange={handleInputChange} />
              <input type="text" placeholder="Location" name="location" onChange={handleInputChange} />
              <br />
              <label>Click on the map to add a device</label>
              <br />

              <input type="number" placeholder="Lattitude" name="latitude" value={lat}/>
              <input type="number" placeholder="Longitude" name="longitude" value={lng} />
              <br />

              <Button onClick={handleSubmit}>Submit</Button>
            </div>
            
          </PopupBody>
        </BasePopup>
      </div>
    );
}
const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
);

export default Test;