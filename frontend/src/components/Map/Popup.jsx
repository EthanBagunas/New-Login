
import React, {useState, useEffect, useContext} from 'react';
import { Unstable_Popup as BasePopup, PopupContext } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import TemporaryDrawer from './Drawer';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { MarkerContext, LevelContext } from './Map';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Button, Paper} from '@mui/material/';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Icon } from '@iconify/react';



const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  background-color:transparent
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;

`,
);

const usePopupState = () => {
  const axiosPrivate = useAxiosPrivate();
  const [anchor, setAnchor] = useState(null);
  
  const {poptext, setPoptext} = useContext(LevelContext);

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;
  const handleClick = (event, level) => {
    setAnchor(anchor ? null : event.currentTarget);
    setPoptext(`${level}`);
  };


const {devmarkers, setDevMarkers} = useContext(MarkerContext)

const handleMarkers = (positions) => {
  setDevMarkers(positions);
};

  useEffect(() => {
    if (poptext !== ''){
        axiosPrivate.get(`/marker/${poptext}`)
          .then(response => {
            console.log('markers are:', response.data);
            handleMarkers(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }
  }, [poptext]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
      setDrawerOpen(newOpen);
    };

  const Popup = () => {
    return (
      <BasePopup id={id} open={open} anchor={anchor} >
        <TemporaryDrawer open={drawerOpen} level={poptext} onClose={toggleDrawer(false)}/>
        <PopupBody onClick={toggleDrawer(true)}>
          <PopupContent/>
        </PopupBody>
      </BasePopup>
    );
  };
  
  return {handleClick, Popup};
};




export default usePopupState;
export {cardinfo, PopupContent};

const themeColors = {
  Normal: "#04dc04", // Green
  Low: "#fcfc04", // Yellow
  Medium: "#ffa500", // Orange
  High: "#fc3c04", // Red
  Extreme: "#e404fc" // Purple
};

const cardinfo= {
  "Normal": {
    main: "ALERT LEVEL 1",
    warning: "BE AWARE: BAD WEATHER CONDITION",
    level:"Water Level Under 5.0m",
  },
  "Low":{
    main: "ALERT LEVEL 2",
    warning: "BE PREPARED: FOR IMMINENT FLOODING",
    level:"Water Level 6.0m to 10.0m ",
  },
  "Medium":{
    main: "ALERT LEVEL 3",
    warning: "BE ALERT: PREPARE TO EVACUATE",
    level:"Water Level 11.0m to 15.0m ",
  },
  "High":{
    main: "ALERT LEVEL 4",
    warning: "TAKE ACTION: EVACUATE NOW",
    level:"Water Level 16.0m to 20.0m ",
  },
  "Extreme":{
    main: "ALERT LEVEL 5",
    warning: "WARNING: SEVERE FLOODING",
    level:"Water Level 21.0m to 50.0m ",
  },
}


const PopupContent= () => {

  const {poptext} = useContext(LevelContext);
  return(
<Box sx={{ml:'30px', display:'flex', marginTop: 2,  border: '2px solid grey', borderRadius: 4, boxShadow: 7 , borderColor: themeColors[poptext],  backgroundColor:'#FFFFFF'}} height={300} width={300} my={4} display="flex" alignItems="center" gap={2} p={2}>
    <React.Fragment>
          <CardContent style={{color: themeColors[poptext]}}>
          <Grid container spacing={2}>
              <Grid item xs={4}>
                <Icon icon= "material-symbols:flood-outline-rounded" style={{height: '70px', width: '70px' , color: "inherit"}}/>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h3" sx={{ fontSize: 30, top: '70px' }} color="text.primary" gutterBottom>
                  {cardinfo[poptext].main}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant= "subtitle2" color="text.secondary">
                  {cardinfo[poptext].warning}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" component="div">
                  {cardinfo[poptext].level}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            
          </CardActions>
      </React.Fragment>
      </Box>
   
  )
}