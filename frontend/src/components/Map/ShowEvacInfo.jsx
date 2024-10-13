import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Modal, FormControl, FormLabel, Radio, RadioGroup} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Drawer from '@mui/material/Drawer';

const EvacInfoPopup = ({anchoredmarker}, openInsert)=> {
  const [evacInfo, setEvacInfo] = useState(anchoredmarker);

  return(
    <div>
        <p>Evac center Information</p>
        <p>Evacuation Center: {evacInfo.EvacName}</p>
        <p>Location: {evacInfo.LOCATION}</p>
        <p>Status: {evacInfo.status}</p>
        <p>Max Capacity: {evacInfo.max_capacity}</p>
        <p>Current Capacity: {evacInfo.current_capacity}</p>
        <Button id='button'>Add Occupants</Button>
        <Drawer open={openInsert}>
          <InsertOccupant/>
        </Drawer>
    </div>
    )
  } 
  
  export default EvacInfoPopup; 
  
  const InsertOccupant= () => {
    const [formData, setFormData] = useState({
      occupant_location: useState(evacInfo.LOCATION),
      familyname: '',
      Under_4ps: false,
      Infants:0,
      Toddlers:0,
      Preschoolers:0,
      SchoolAge:  0,
      Teenage: 0,
      Adult:0,
      Senior_Citizen:0,
      Pregnant_women: 0,
      Lactating_mothers: 0,
      Solo_Parent:0,
    });
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
    return(

      
      <FormControl>
    <FormLabel>Click on the map to add device positions</FormLabel>
      <TextField
        id="familyname" label="Family Name"
        name="familyname" variant="outlined"
        onChange={handleInputChange} margin= "normal"/>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          >
          <FormControlLabel value="female" control={<Radio />} label="Yes" />
          <FormControlLabel value="male" control={<Radio />} label="No" />
        </RadioGroup>
        <NumberInput aria-label="Quantity Input" min={1} max={99}/>
      <Button sx={{color:"#000000", backgroundColor: red[500] }} >Submit</Button>
</FormControl>
)
}

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
    slots={{
      root: StyledInputRoot,
      input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: 'increment',
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});



const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
};

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

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`,
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);