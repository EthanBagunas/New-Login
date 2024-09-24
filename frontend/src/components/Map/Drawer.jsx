import React, {useState, useEffect} from 'react';
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

const TemporaryDrawer = ({ open, level }) => {
  const [level_list, setLevel_list] = useState('');
  
  const handleList= (levels) => {
    setLevel_list(levels);
  }

  useEffect(() => { 
    console.log("drawer open is:", open);
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
        left: '20%', // Set left to 50% to center the drawer horizontally13          
        transform: 'translate(-50%, -50%)', // Translate the drawer to center it14          
        width: 300, // Set the width of the drawer15        
        height: 700, // Set the height of the drawer      
        }}} >
        <CardList levels={level_list} theme={level}/>        
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
