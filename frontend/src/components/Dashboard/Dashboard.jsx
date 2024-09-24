import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddDevice from './AddDevices';

import TemporaryDrawer from '../Map/Drawer';
import Collapse from '@mui/material/Collapse';
import { Icon } from '@iconify/react';


const Dashboard = ({lat, lng, setLat, setLng}) => {
  return (
    <div>
      <Drawer 
      variant='permanent'
      PaperProps={{      
        sx: {      
        borderRadius: 100,
        position: 'absolute', // Set position to absolute    
        top: '50%', // Set top to 50% to center the drawer vertically
        left: '5%', // Set left to 50% to center the drawer horizontally        
        transform: 'translate(-50%, -50%)', // Translate the drawer to center it       
        width: 75, // Set the width of the drawer15        
        height: 650, // Set the height of the drawer      
        }}} >
          <div style={{
            position: 'absolute',
            top: '70%',
            left:'50%',
            transform: 'translate(-50%, -50%)',
            width: 75,
            height: 650,
            borderRadius: 100,
          }}>

        <AddDevice lat={lat} lng= {lng} setLat={setLat} setLng={setLng}/>  
        <Icon icon="healthicons:ui-user-profile" style={{ color: '#ff3300', width: '60px', height: '60px', margin: '40px 0' }} />
  <Icon icon="mingcute:alert-line" style={{ color: '#ff3300', width: '60px', height: '60px', margin: '10px 0' }} />
  <Icon icon="marketeq:settings" style={{ color: '#ff3300', width: '60px', height: '60px', margin: '10px 0' }} />
       
          </div>

      </Drawer>
    </div>
  );
};

export default Dashboard;



