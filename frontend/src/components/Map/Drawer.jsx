import React, {useState, useEffect, createContext} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import CardList from './Card'
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Icon } from '@iconify/react';
import DataTable from './HistoryTable';
import {Button} from '@mui/material'
export const widthContext= createContext();

const TemporaryDrawer = ({ open, level }) => {
  const [level_list, setLevel_list] = useState('');
  const [drawerwidth, setDrawerWidth] = useState(350);
  
  const handleList= (levels) => {
    setLevel_list(levels);
  }
  //const [drawer_width, setDrawerWidth]= useState(300);

  const handleExtend = (event, value) => {
    setDrawerWidth(value);
    event.stopPropagation();
  };




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
      <Drawer open={open} hideBackdrop ={true} 
      PaperProps={{      
        sx: {      
          borderRadius: 4,
          position: 'absolute', // Set position to absolute    
          top: '50%', // Set top to 50% to center the drawer vertically
          left: '20%', // Set left to 50% to center the drawer horizontally13          
          transform: 'translate(-50%, -50%)', // Translate the drawer to center it14          
          width: 350,
          height: 700, // Set the height of the drawer      
        }}} >
            <widthContext.Provider value= {[drawerwidth, setDrawerWidth]}>
            <Button onClick={(event)=> handleExtend(event, 1000)}>Extend Drawer</Button>
            <Grid container justifyContent="center" >
            
              <Grid item xs={10}>
                  <Typography variant="h2" style={{ position:'relative', top:'20px', left:'5%', fontSize: 20 }} color='##000000'>
                    Water Level Station
                  </Typography>
              </Grid>
              <Grid item xs= {2}>
                <Icon icon='pajamas:go-back' style={{fontSize:'4em', color:'#ff3300', position:'relative', left:'500px'}}/>
              </Grid>
              <Grid item xs={6} sx={{position: 'relative', top:'30px', left: '5%'}}>
                <CardList levels={level_list} theme={level}/> 
              </Grid>
              <Grid item xs={6} sx={{position: 'relative', top:'30px', left: '500px'}}>
                  <DataTable draweropen= {open}/>
              </Grid>
            </Grid>
            </widthContext.Provider>
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;

