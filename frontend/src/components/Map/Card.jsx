import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import Divider from '@mui/material/Divider';
import { Paper } from '@mui/material';
import { Icon } from '@iconify/react';


import { DrawerExtendedContext, LogsDataContext } from './Drawer';

const themeColors = {
  Normal: "#04dc04", // Green
  Low: "#fcfc04", // Yellow
  Medium: "#ffa500", // Orange
  High: "#fc3c04", // Red
  Extreme: "#e404fc" // Purple
};

// design of a single card
const CardItem= ({theme, items}) => {
  const {SetLogsData} = useContext(LogsDataContext);
  const {setShowHistory, setShowCamfeed} = useContext(DrawerExtendedContext);

  const handleSetLogsTabledata = (value) => {
    SetLogsData(value)
    setShowCamfeed(false);
    setShowHistory(true);
  }

  const handleFeed = () => {
    setShowHistory(false);
    setShowCamfeed(true);
  }
  return(
        <Box sx={{ml:'30px', display:'flex', marginTop: 2,  border: '2px solid grey', borderRadius: 4, borderColor: themeColors[theme], boxShadow: 7 ,  }} height={300} width={250} my={4} display="flex" alignItems="center" gap={4} p={2}>
        <Box sx={{ minWidth: 250 }}>
          <React.Fragment>
                <CardContent style={{color: themeColors[theme]}}>
                  <HouseboatIcon style={{width: '20%', height: '20%', color: "inherit"}}/>
                  <Typography variant="h1" sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                    {items.DEVICE_ID}
                  </Typography>
                  <Typography variant= "subtitle2" color="text.secondary">
                   {parseFloat(items.LATTITUDE).toFixed(6)}, {parseFloat(items.LONGITUDE).toFixed(6)} 
                    <br/>
                  {items.LOCATION}
                  </Typography>
                  <Typography variant="h5" component="div">
                    Water Level: {items.DIST_M}
                  </Typography>
                  <Typography variant="body2">
                    {items.CAP_DATETIME}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {
                  handleSetLogsTabledata(items.DEVICE_ID)}}>
                    Learn More
                  </Button>
                  <Button size="large" onClick={() => {
                  handleFeed()}}>
                    <Icon icon="fluent:camera-dome-48-regular" style={{fontSize:'4em'}}/>
                  </Button>
                </CardActions>
            </React.Fragment>
          </Box>
        </Box>
    )
};
  

// for each of the unique entries
 const CardList= (list, theme)=> {
  const [cardlist, setCardList] =useState('');
  const handleCardlist= ()=> {
    setCardList(list);
  }
  useEffect(() => {

    if (list && list.levels !== "") {
      handleCardlist(list);
      console.log("This is my list: ", list);
    }
  }, [list, theme]);

  return(
      <Paper sx={{ height:600, width: 350, overflow: 'auto' }} elevation={4} role="presentation" >
      {cardlist && cardlist.levels.map((item, index) => (
        <CardItem key={index} items= {item} theme={cardlist.theme}/>
      ))}
      <Divider />
      </Paper>
  )
}

export default CardList;