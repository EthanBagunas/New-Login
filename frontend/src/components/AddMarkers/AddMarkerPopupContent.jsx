import React, { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';
import {Button, Box} from '@mui/material';
import BasicSelect from "../BaseMUI/DropDownInput";
import { NewMarkerContext } from "../Map/Map";

const AddMarkerPopupContent = ({markertype, }) => {
    const {latitude, longitude, SetLatitude, SetLongitude}= useContext(NewMarkerContext)
    const axiosPrivate = useAxiosPrivate();
    const theme =useTheme();


    const [formData, setFormData] = useState({
        deviceName:'',
        evacName:'', 
        location: '',
        latitude: null,
        longitude: null,
        currentstatus: '',
      });
  
      useEffect(() => {
        setFormData({
          ...formData, 
          latitude: latitude,
          longitude: longitude,
          });
      },[latitude, longitude])
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleSubmit = (event) => {
        console.log(formData);
        /*
        event.preventDefault();
        axiosPrivate.post(`/setdevices`, formData)
          .then(response => {
            console.log(response.data);
            return { message: 'Successfully added device' };
          })
          .catch(error => {
            console.error(error);
            res.error('An error occurred. Please try again.');
          });
        */
          SetLatitude(null);
          SetLongitude(null);
      };
      return (
        <FormControl margin="normal">
              <FormLabel>Click on the Map for the Positon</FormLabel>
              {markertype == 'dev' && (

              <TextField
              id="deviceName"  label="Device Name"
              name="deviceName"variant="outlined"
              onChange={handleInputChange}
              margin="normal"
              />
              )}
              {markertype == 'evac' && (
                <TextField
                  id="evacName" label="Evacuation Zone Name"
                  name="evacName" variant="outlined"
                  onChange={handleInputChange}
                  margin="normal"
                />
              )}
              <TextField
                id="location"
                label="Location"
                name="location"
                variant="outlined"
                onChange={handleInputChange}
                margin= "normal"
              />

              <BasicSelect type='status' label='Status' inputval={formData.currentstatus} handleChange={handleInputChange}/>

              <TextField
                id="latitude"
                label="Latitude"
                variant="outlined"
                value={latitude}
                disabled
                margin= "normal"
                InputLabelProps={{
                  shrink: true, // This will make the label raised by default
                }}
              />
              <TextField
                id="longitude"
                label="Longitude"
                variant="outlined"
                value={longitude}
                disabled
                margin= "normal"
                InputLabelProps={{
                  shrink: true, // This will make the label raised by default
                }}
              />
                
              <Button sx={{color:"#000000",backgroundColor: theme.palette.primary.main }} onClick={handleSubmit}>Submit</Button>
            </FormControl>
      )
}



export default AddMarkerPopupContent;