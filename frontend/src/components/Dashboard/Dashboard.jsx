import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import AddDevice from './AddDevices';

import { Icon } from '@iconify/react';

import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const Dashboard = ({lat, lng, setLat, setLng}) => {

  return (
    <div>
      <Drawer 
      variant='permanent'
      sx= {{
      }}
      PaperProps={{      
        sx: {      
        borderColor: 'inherit', 
        borderRadius: 100,
        position: 'absolute', // Set position to absolute    
        top: '50%', // Set top to 50% to center the drawer vertically
        left: '5%', // Set left to 50% to center the drawer horizontally        
        transform: 'translate(-50%, -50%)', // Translate the drawer to center it       
        width: 60, // Set the width of the drawer15        
        height: 400, // Set the height of the drawer      
        }}} >
        <Grid container spacing={2} style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
          <Grid item size={12}>
            <AddDevice lat={lat} lng= {lng} setLat={setLat}   setLng={setLng} /> 
          </Grid>
          <Grid item size={12}>
            <Button>
              <Icon icon="healthicons:ui-user-profile" style={{ color: '#ff3300', width: '30px', height: '30px', margin: '10px 0' }} />
            </Button>
          </Grid>
          <Grid item size={12}>
            <Button>
              <Icon icon="mingcute:alert-line" style={{ color: '#ff3300', width: '30px', height: '30px', margin: '10px 0' }} />
            </Button>
          </Grid>
          <Grid item size={12}>
            <Button>
              <Icon icon="ic:round-settings" style={{ color: '#ff3300', width: '30px', height: '30px', margin: '10px 0' }} />
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
};

export default Dashboard;


