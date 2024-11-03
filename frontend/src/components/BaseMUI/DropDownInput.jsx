import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
export default function BasicSelect({type, inputval, label, handleChange}) {
  

  return (
    <Box sx={{minWidth: type !== 'status' ? 120: 400}}>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        {type  === 'gender' && (
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inputval}
          label={label}
          onChange={(event) => handleChange(type, event.target.value)}
          >

          <MenuItem value= {'Male'}>Male</MenuItem>
          <MenuItem value= {'Female'}>Female</MenuItem>
        </Select>
        )}

        
        {type  === 'status' && (
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='currentstatus'
          value={inputval}
          label={label}
          onChange={(event) => handleChange(event)}
          >
          <MenuItem value= {'Available'}>Available</MenuItem>
          <MenuItem value= {'ON-going Maintenance'}>ON-going Maintenance</MenuItem>
          <MenuItem value= {'Not-Available'}>Not Available</MenuItem>
        </Select>
        )}
        

      </FormControl>
    </Box>
  
  );
}
