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



export const DrawerExtendedContext= createContext();

const TemporaryDrawer = ({ open, level, onClose}) => {
  const [level_list, setLevel_list] = useState('');
  const [drawerstatus, setDrawerStatus] = useState(false);

  const handleList= (levels) => {
    setLevel_list(levels);
  }
  
  const handleExtend = () => {
    setDrawerStatus(true);
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

  useEffect(()=> {
    console.log('status is:', drawerstatus)
  },[drawerstatus])
  
  return (
    <div>
      <Drawer open={open} hideBackdrop={true} 
      PaperProps={{      
        sx: {      
          borderRadius: 4,
          position: 'absolute', // Set position to absolute    
          top: '50%', // Set top to 50% to center the drawer vertically
          left: '20%', // Set left to 50% to center the drawer horizontally13          
          transform: 'translate(10%, -50%)', // Translate the drawer to center it14          
          width : 1000,
          height: 700, // Set the height of the drawer  
        }}} >
            <Button onClick={onClose}>Close Drawer
            </Button>
            <Grid container justifyContent="center" >

              <Grid item xs={12}>
                  <Typography variant="h2" style={{ position:'relative', top:'20px', left:'5%', fontSize: 20 }} color='##000000'>
                    Water Level Station
                  </Typography>
              </Grid>

              <Grid item xs={6} sx={{position: 'relative', top:'30px', left: '5%'}}>
                  <DrawerExtendedContext.Provider value={{handleExtend}}>
                    <CardList levels={level_list} theme={level} /> 
                  </DrawerExtendedContext.Provider>
              </Grid>

              {drawerstatus &&
              <Grid item xs={6} sx={{position: 'relative', top:'30px', right: '100px'}}>
                  <DataTable />
              </Grid>}

              {drawerstatus &&
                <Grid item xs= {2}>
                    <Icon icon='material-symbols:assignment-return-rounded' style={{fontSize:'4em', color:'#ff3300', position:'relative',right:'100px'}} 
                    onClick={() => {
                      handleExtend(false);
                    }}/>
                </Grid>}

            </Grid>
      </Drawer>
                  
    </div>
  );
};

export default TemporaryDrawer;

