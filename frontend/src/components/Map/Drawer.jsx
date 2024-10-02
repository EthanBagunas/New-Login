import React, {useState, useEffect, createContext} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import axios from 'axios';
import CardList from './Card'
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Icon } from '@iconify/react';
import DataTable from './HistoryTable';
import FeedPopup from './FeedPopup';
import {Button} from '@mui/material'


export const DrawerExtendedContext= createContext();
export const LogsDataContext = createContext();


const TemporaryDrawer = ({ open, level, onClose}) => {
  
  const [level_list, setLevel_list] = useState('');

  const [logsdata, SetLogsData]= useState('');
  const [showhistory, setShowHistory] = useState(false);
  const [showcamfeed, setShowCamfeed]= useState(false);


  const handleHide= ()=> {
    setShowHistory(false);
    setShowCamfeed(false);
  }

  const handleList= (levels) => {
    setLevel_list(levels);
  }
  
  
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
      <LogsDataContext.Provider value={{logsdata, SetLogsData}}>
      <Drawer open={open} hideBackdrop={true} 
      PaperProps={{      
        sx: {      
          borderRadius: 4,
          position: 'absolute', // Set position to absolute    
          top: '50%', // Set top to 50% to center the drawer vertically
          left: '20%', // Set left to 50% to center the drawer horizontally13          
          transform: 'translate(10%, -50%)', // Translate the drawer to center it14          
          width : 1000,
          height: 750, // Set the height of the drawer  
          flex:1,
        }}} >
          
            <Grid container justifyContent="center" >
              <Grid item xs={10}>
                  <Typography variant="h2" style={{ position:'relative', top:'20px', left:'5%', fontSize: 20 }} color='##000000'>
                    Water Level Station
                  </Typography>
              </Grid>
              <Grid item xs= {2}>
                {(showhistory || showcamfeed) &&
                  <Icon icon='solar:map-arrow-left-bold' style={{fontSize:'2em', color:'#00ccff', position:'relative',right:'20px',}} onClick={() => {handleHide(false)}}/>}
              </Grid>
              <Grid item xs={6} sx={{position: 'relative', top:'30px', left: '5%'}}>
                  <DrawerExtendedContext.Provider value={{setShowHistory, setShowCamfeed}}>
                    <CardList levels={level_list} theme={level}  /> 
                  </DrawerExtendedContext.Provider>
                  
              </Grid>

              <Grid item xs={6} sx={{position: 'relative', top:'30px', right: '50px'}}>
              {(showhistory ^ showcamfeed) ? (showhistory ? <DataTable /> : <FeedPopup />) : null}
              </Grid>    
              
             
            </Grid>
            <Button onClick={onClose} style= {{margin:'20px', position:'relative', top:'5%', backgroundColor: '#00ccff', borderRadius: 4}}>
              <Icon icon='uil:down-arrow' style={{color:'#ffffff', }}/>
            </Button>
      </Drawer>
                </LogsDataContext.Provider>
                  
    </div>
  );
};

export default TemporaryDrawer;

