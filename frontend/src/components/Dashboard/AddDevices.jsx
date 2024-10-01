import React, { useEffect, useState } from "react";
import axios from 'axios'
import Button from '@mui/material/Button';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';
import { Icon } from '@iconify/react';

import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';

const red = {
  50:  '#FFD7BE',
100: '#FFC6B3',
200: '#FFB99F',
300: '#FFA47E',
400: '#FF8F63',
500: '#FF3300',
600: '#C62F00',
700: '#A52600',
800: '#7F1E00',
900: '#5B1600',
};

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
    const NewDevice= ()=>{
      return(
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
                  <Button sx={{color:"#000000", backgroundColor: red[500] }} onClick={handleSubmit}>Submit</Button>
      </FormControl>
      )
    } 
    const UpdateDevice= ()=>{
      return(
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
                  <Button sx={{color:"#000000", backgroundColor: red[500] }} onClick={handleSubmit}>Submit</Button>
      </FormControl>
      )
    } 
    const [tab, setTab]= useState(0);
    const handleTab = (event, newValue) => {
      setTab(newValue)
    }
    return (
      <div>
        <Button onClick={handleAnchor} >
          <Icon icon="icon-park:water-level" style={{ color: '#ff3300', width: '30px', height: '30px' }} />
        </Button>
        <BasePopup id={id} open={open} anchor={anchor} placement="right-end">
          <PopupBody> 
            <Tabs defaultValue={1}>
              <TabsList>
                <Tab value={1}>Create Device</Tab>
                <Tab value={2}>Update Device</Tab>
              </TabsList>
              <TabPanel value={1}><NewDevice/></TabPanel>
              <TabPanel value={2}><UpdateDevice/></TabPanel>
            </Tabs>
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




const Tab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 50%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${red[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${red[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${red[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.6;
  `,
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 100px;
  background-color: ${red[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);


export default AddDevice;