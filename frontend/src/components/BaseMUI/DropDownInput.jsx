import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({type, inputval, label, handleChange}) {


  return (
    <Box sx={{ minWidth: 120 }}>
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
      </FormControl>
    </Box>
  );
}
