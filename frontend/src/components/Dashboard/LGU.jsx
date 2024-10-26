import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Popper } from '@mui/material';
import { FormControl, FormLabel, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AddLGU = ({ lat, lng, setLat, setLng }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAnchor = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  // Function to handle page navigation
  const handleRedirect = (path) => {
    navigate(path); // Use navigate for redirection
    setLat(null);
    setLng(null);
  };

  return (
    <div>
      <Button onClick={handleAnchor}>
        <Icon 
          icon="ic:round-settings" 
          style={{ color: '#ff3300', width: '30px', height: '30px', margin: '1px', marginRight: '16px' }} 
        />
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="right">
        <div style={popupStyle}>
          <FormControl>
            <FormLabel style={{ color: 'black' }}>General Settings</FormLabel>
            {/* Redirect buttons with enlarged icons and labels */}
            <Button onClick={() => handleRedirect('/lgu-setup')} style={buttonStyle}>
              <Icon icon="mdi:city" style={{ marginRight: '4px', width: '40px', height: '40px' }} />
              <Typography variant="body1">LGU Setup</Typography>
            </Button>
            <Button onClick={() => handleRedirect('/brgy-setup')} style={buttonStyle}>
              <Icon icon="mdi:home-circle" style={{ marginRight: '4px', width: '40px', height: '40px' }} />
              <Typography variant="body1">Brgy Setup</Typography>
            </Button>
            <Button onClick={() => handleRedirect('/purok-setup')} style={buttonStyle}>
              <Icon icon="mdi:map-marker" style={{ marginRight: '4px', width: '40px', height: '40px' }} />
              <Typography variant="body1">Purok Setup</Typography>
            </Button>
 
          </FormControl>
        </div>
      </Popper>
    </div>
  );
};

const popupStyle = {
  position: 'absolute',
  padding: '16px', 
  top: '-20px', // Adjust this value as needed
  margin: '8px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1,
  width: '250px', // Set a fixed width for the popup
  maxWidth: '300px', // Optional: set a maximum width
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start', // Align items to the start
  marginBottom: '8px', // Space between buttons
  color: 'black',
};

export default AddLGU;
