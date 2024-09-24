import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Grid, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import { blue } from "@mui/material/colors";
import OtpTimer from 'otp-timer';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';
import { Icon } from '@iconify/react';






const AddDevice = ({lat, lng, setLat, setLng}) => {

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

        setLat(null);
        setLng(null);
    };
  
    return (
      <div>
        <Button onClick={handleAnchor} >
          <Icon icon="icon-park:water-level" style={{ width: '60px', height: '60px' }} />
        </Button>
        <BasePopup id={id} open={open} anchor={anchor} placement="right-end">
          <PopupBody> 
          <FormControl>
              <FormLabel>Click on the map to add device positions</FormLabel>
              <TextField
                id="deviceName"
                label="Device Name"
                name="deviceName"
                variant="outlined"
                onChange={handleInputChange}
                margin= "normal"
              />
              <TextField
                id="location"
                label="Location"
                name="location"
                variant="outlined"
                onChange={handleInputChange}
                margin= "normal"
              />
              <TextField
                id="latitude"
                label="Latitude"
                variant="outlined"
                value={lat}
                disabled
                margin= "normal"
              />
              <TextField
                id="longitude"
                label="Longitude"
                variant="outlined"
                value={lng}
                disabled
                margin= "normal"
              />
              <Button sx={{color:"#000000", backgroundColor: theme.palette.primary.main }} onClick={handleSubmit}>Submit</Button>
            </FormControl>
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

export default AddDevice;