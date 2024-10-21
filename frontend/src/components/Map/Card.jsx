import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DrawerExtendedContext, LogsDataContext } from './Drawer';
import { Icon } from '@iconify/react';

const themeColors = {
  Normal: "#04dc04", // Green
  Low: "#fcfc04", // Yellow
  Medium: "#ffa500", // Orange
  High: "#fc3c04", // Red
  Extreme: "#e404fc" // Purple
};

// design of a single card
const CardItem= ({theme, items}, drawershow) => {
  const {SetLogsData} = useContext(LogsDataContext);
  const {setDrawerStatus} = useContext(DrawerExtendedContext);

  const handleSetLogsTabledata = (value) => {
    setDrawerStatus(true);
    SetLogsData(value)
  }

  return(
        <Box sx={{ml:'30px', display:'flex', marginTop: 2,  border: '2px solid grey', borderRadius: 4, borderColor: themeColors[theme], boxShadow: 7 ,  }} height={300} width={250} my={4} display="flex" alignItems="center" gap={2} p={2}>
        <Box sx={{ minWidth: 250 }}>
          <React.Fragment>
                <CardContent style={{color: themeColors[theme]}}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Icon icon= "material-symbols:flood-outline-rounded" style={{height: '70px', width: '70px' , color: "inherit"}}/>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="h3" sx={{ fontSize: 30, top: '70px' }} color="text.primary" gutterBottom>
                        {items.DEVICE_ID}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant= "subtitle2" color="text.secondary">
                        {parseFloat(items.lat).toFixed(6)}, {parseFloat(items.lng).toFixed(6)} 
                        <br/>
                        {items.LOCATION}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h5" component="div">
                        Water Level: {items.DIST_M}
                      </Typography>
                      <Typography variant="body2">
                        {items.CAP_DATETIME}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                {drawershow && (
                  <Button size="small" onClick={() => {
                    handleSetLogsTabledata(items.DEVICE_ID)} 
                    }>
                      Learn More
                    </Button>
                  )}
                <CardActions>
                  
                </CardActions>
            </React.Fragment>
          </Box>
        </Box>
    )
};
  
// for each of the unique entries
 const CardList= (list, theme, drawershow)=> {

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
        <CardItem key={index} items= {item} theme={cardlist.theme} drawershow={drawershow}/>
      ))}
      <Divider />
      </Paper>
  )
}

export default CardList;
export {CardItem}