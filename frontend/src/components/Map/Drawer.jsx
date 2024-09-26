import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import CardList from './Card'

import Grid from '@mui/material/Unstable_Grid2/Grid2';

import DataTable from './HistoryTable';

export const LogsDataContext = React.createContext();



const TemporaryDrawer = ({ open, level }) => {
  const [level_list, setLevel_list] = useState('');
  
  const handleList= (levels) => {
    setLevel_list(levels);
  }
  //const [drawer_width, setDrawerWidth]= useState(300);


  useEffect(() => { 
    if (open) {
      axios.get(`http://localhost:7000/list/${level}`)
        .then(response => {
          handleList(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } 
  }, [open]);

  
 
  return (
    <div>
      <Drawer open={open} hideBackdrop ={true} PaperProps={{      
        sx: {      
          borderRadius: 4,
          position: 'absolute', // Set position to absolute    
          top: '50%', // Set top to 50% to center the drawer vertically
          left: '40%', // Set left to 50% to center the drawer horizontally13          
          transform: 'translate(-50%, -50%)', // Translate the drawer to center it14          
          width: 1000, // Set the width of the drawer15        
          height: 700, // Set the height of the drawer      
        }}} >
            <Grid container>
              <Grid item xs={4}>
                <CardList levels={level_list} theme={level}/> 
              </Grid>
              <Grid item xs= {6}>
                  <DataTable draweropen= {open}/>
              </Grid>
            </Grid>
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;

